const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'development',
  output: {
    // path: path.join(process.cwd(), 'build'),
    // publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
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
