import webPack from 'webpack';
import path from 'path';
import fs from 'fs';
import utils from '../utils';
import {StringDecoder} from 'string_decoder';
import webpackDevMiddleware from 'webpack-dev-middleware';
import hotReload from 'webpack-hot-middleware';

let webpackConfig = require(
  `${__dirname}/../../webpack/webpack.${utils.env.isProduction ? 'prod' : 'dev'}.js`
);

let bundleStart = null;
let compiler = webPack(webpackConfig);

let requests = [];
let webpackFs;

let decoder = new StringDecoder('utf8');

// Webpack starts bundling
compiler.plugin('compile', function() {
  bundleStart = Date.now();
});

// Webpack is done compiling
compiler.plugin('done', function() {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');

  webpackFs = compiler.outputFileSystem;
  processRequests();
});

const WebPackMiddleware = webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  colors: true,
  headers: {'X-Webpack-Rendered': 'yes'}
});

const query = function(path, cb) {
  requests.push({path, cb});
  processRequests();
};

const HotReloadMiddleware = hotReload(compiler);

function processRequests() {
  if (!webpackFs) {
    return;
  }

  let req = requests.pop();

  if (!req) {
    return;
  }

  webpackFs.readFile(webpackConfig.output.path + '/' + req.path, function(err, data) {
    req.cb(err, decoder.write(data));
  });

  processRequests();
}

export default {
  WebPackMiddleware,
  query,
  HotReloadMiddleware
}