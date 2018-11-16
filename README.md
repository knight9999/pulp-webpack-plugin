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

## Examples of webpack.config

### simple case

```
var PulpWebpackPlugin = require('pulp-webpack-plugin');
```

```
  plugins: [
    new PulpWebpackPlugin({
      'main': 'Main',
      'src-path': 'src',
      'to': 'public/app.js'
    })
  ]
```

### with additional module

```
var PulpWebpackPlugin = require('pulp-webpack-plugin');
```

```
  plugins: [
    new PulpWebpackPlugin({
      'main': 'Main',
      'src-path': 'src',
      'modules': 'MyEcho',
      'to': 'public/app.js'
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
      'to': 'public/app.js'
    })
  ]
```

### browserify


```
  plugins: [
    new PulpWebpackPlugin({
      'build': 'browserify',
      'main': 'Main',
      'src-path': 'src',
      'to': 'public/app.js'
    })
  ]
```

### no-watch

```
  plugins: [
    new PulpWebpackPlugin({
      'no-watch': true
      'build': 'browserify',
      'main': 'Main',
      'src-path': 'src',
      'to': 'public/app.js'
    })
  ]
```

This case pulp does not watch for `webpack -w`.
