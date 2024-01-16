'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],// other stuff
      fallback: {
        "stream": false,
        "http": false,
        "stream": false,
        "timers": false,
        "querystring": false,
        "vm": false,
        "string_decoder": false,
        "https": false
      }
    },
    entry: {
      popup: PATHS.src + '/popup.js',
      contentScript: PATHS.src + '/contentScript.js',
      background: PATHS.src + '/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
