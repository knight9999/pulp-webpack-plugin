const childProcess = require('child_process');

function PulpWebpackPlugin(options) {
  // console.log(options);
  this.options = options;
}

let watchProcess = null;

PulpWebpackPlugin.prototype.apply = function (compiler) {
  compiler.hooks.watchRun.tapPromise('PulpWebpackPluginHooks',  (source, target, routesList) => {
    if (compiler.watchMode && watchProcess == null) {
      if (this.options['no-watch']) {
        console.log("skipping pulp watch ----------");
        return Promise.resolve();
      }
      return execPulp(this.options, false).then(() => {
        console.log("pulp watch start----------");
        execPulp(this.options, true).then(() => {
          watchProcess = null;
        }, (err) => { 
          console.error(err);
          watchProcess = null;
          process.exit(1);
        });
        return Promise.resolve();
      });
    }
    return Promise.resolve();
  });
  compiler.hooks.beforeRun.tapPromise('PulpWebpackPluginHooks',  (source, target, routesList) => {
    console.log("beforeRun----------");
    return execPulp(this.options, false);
  });

  const execPulp = function (options, isWatch) {
    return new Promise((resolve, reject) => {
      const pulp = getPulp(options);
      const commands = isWatch ? ['--watch'].concat(getCommands(options)) : getCommands(options);
      let proc = childProcess.spawn(pulp, commands);
      proc.on('exit', function (code) {
        console.log('pulp finished.');
        resolve();
      });
      proc.on('error', function (err) {
        console.error(err);
        reject(err);
      });
      proc.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      proc.stderr.on('data', (data) => {
        console.error(data.toString());
      });
      if (isWatch) {
        watchProcess = proc;
      }
    });
  }

  let getPulp = function (options) {
    let pulp = 'pulp';
    if (options.pulp) {
      pulp = options.pulp;
    }
    return pulp;
  };

  let getCommands = function (options) {
    let build = 'build'; // build or browserify
    if (options.build) {
      build = options.build;
    }
    let commands = [build];
    ['build-path', 'dependency-path', 'include', 'main', 'modules', 'to', 'src-path', 'test-path', 'standalone'].forEach((key) => {
      if (key in options) {
        commands.push('--' + key);
        commands.push(options[key]);
      }
    });
    ['no-check-main', 'optimise', 'source-maps', 'skip-entry-point'].forEach((key) => {
      if (key in options) {
        if (options[key]) {
          commands.push('--' + key)
        }
      }
    });
    return commands;
  }



};

module.exports = PulpWebpackPlugin;


