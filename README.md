## What is this?

This is a webpack plugin. 
This pluins is available for webpack 4 or after.

Execute pulp command from webpack.

## Environment

This plugin call `pulp` command.
Therefore please install pulp globally.

```
$ npm install -g pulp
```

Or specify pulp command path as follows.

## Example of webpack.config

```
var PulpWebpackPlugin = require('pulp-webpack-plugin');
```

```
  plugins: [
    new PulpWebpackPlugin({
      'main': 'Main',
      'src-path': 'src',
      'to': 'public/app3.js'
    })
  ]
```

### specify pulp command path

```
  plugins: [
    new PulpWebpackPlugin({
      'pulp': '/path/to/pulp',
      'main': 'Main',
      'src-path': 'src',
      'to': 'public/app3.js'
    })
  ]
```
