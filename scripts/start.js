'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';


const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.dev.config');

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new webpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});
