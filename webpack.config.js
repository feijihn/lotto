var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, './');
var BUILD_DIR = path.resolve(__dirname, './public/build');

var config = {
	entry: {
		client: APP_DIR + '/app/index.js',
    admin: APP_DIR + '/app/admin/index.js'
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		alias: {},
		extensions: ['', '.jsx', '.js']
	},
	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
			},
			{ test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
};

module.exports = config;
