const childProcess = require('child_process');

function PulpWebpackPlugin(options) {
  // console.log(options);
  this.options = options;
}

PulpWebpackPlugin.prototype.apply = function (compiler) {
  compiler.hooks.beforeRun.tapPromise('PulpWebpackPluginHooks',  (source, target, routesList) => {
    return new Promise(resolve => {
      let pulp = 'pulp';
      if (this.options.pulp) {
        pulp = this.options.pulp;
      }
      let commands = ['build'];
      ['build-path', '--dependency-path', 'include', 'main', 'modules', 'to', 'src-path', 'test-path'].forEach((key) => {
        if (key in this.options) {
          commands.push('--' + key);
          commands.push(this.options[key]);
        }
      });
      ['optimise', 'source-maps'].forEach((key) => {
        if (key in this.options) {
          if (this.options[key]) {
            commands.push('--' + key)
          }
        }
      });
      // console.log(commands);
      childProcess.execFile(pulp, commands, (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        }
        console.log(stdout);
        resolve();
      });
    });
  });
};

module.exports = PulpWebpackPlugin;


