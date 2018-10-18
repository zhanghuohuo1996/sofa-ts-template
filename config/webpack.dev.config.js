const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'development',
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    config.entry,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
});
