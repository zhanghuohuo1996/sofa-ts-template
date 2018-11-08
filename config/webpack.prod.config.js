const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
