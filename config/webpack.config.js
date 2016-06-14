const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PATHS = {
  app: {
    client: path.resolve(__dirname, '../app'),
    admin: path.resolve(__dirname, '../admin-app')
  },
  styles: path.resolve(__dirname, '../public/stylesheets'),
  build: path.resolve(__dirname, '../public/build'),
  public: path.resolve(__dirname, '../public')
};

const plugins = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

const config = {
  env: process.env.NODE_ENV,
  entry: {
    client: [path.resolve(PATHS.app.client + '/index.js'), 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'],
    admin: [path.resolve(PATHS.app.admin + '/index.js'), 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr']
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATHS.app.client,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.jsx?$/,
        include: PATHS.app.admin,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: plugins,
  devtool: 'eval'
};

module.exports = config;
