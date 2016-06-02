const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: {
    client: path.resolve(__dirname, './app'),
    admin: path.resolve(__dirname, './app/admin')
  },
  styles: path.resolve(__dirname, './public/stylesheets'),
  build: path.resolve(__dirname, './public/build'),
  public: path.resolve(__dirname, './public')
};

const plugins = [
  //new CopyWebpackPlugin([
    //{
      //from: PATHS.images,
      //to: 'images'
    //}
  //]),
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  // This plugin moves all the CSS into a separate stylesheet
  new ExtractTextPlugin('css/app.css', { allChunks: true }),
  new HtmlWebpackPlugin({
    title: 'lotalot',
    filename: './public/index.html'
  })
];

const config = {
  env: process.env.NODE_ENV,
  entry: {
    client: path.resolve(PATHS.app.client + '/index.js'), 
    admin: path.resolve(PATHS.app.admin + '/index.js') 
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js',
    publicPath: ''
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
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATHS.app.client,
        loaders: ['babel']
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
};

module.exports = config;
