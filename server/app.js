// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || process.env.$PORT; //3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var colors = require('colors');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');

var configDB = require('../config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('../config/passport')(passport); // pass passport for configuration
// require('./webpack.dev.js')(app);
console.server = (text) => console.log('[SERVER]'.blue + ' ' + text);
console.err = (text, error) => console.error('[ERROR]'.bgRed.yellow + ' ' + text.bgRed.yellow + '\n' + error);
console.webpack = (text) => conole.log('[WEBPACK]'.magenta + ' ' + text);

(function() {
  if (process.env.NODE_ENV === 'development') {
    console.server('running webpack middleware...');
    var webpack = require('webpack');
    var webpackConfig = require('../config/webpack.config.js');
    var compiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(compiler, {
      hot: true,
      noInfo: false,
      stats: {
        colors: true
      },
      historyApiFallback: true,
      publicPath: '',
      contentBase: './app'
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.webpack,
      heartbeat: 10 * 1000
    }));
  }
})();
app.set('view engine', 'pug');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
})); // get information from html forms
app.use(bodyParser.json()); // get information from html forms

// required for passport
app.use('/public', express.static('public'));
app.use(session({
  secret: '4kyldysh20',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.server('Listening on port ' + port.black.bgYellow + ' ...');
if (process.env.NODE_ENV) {
  console.server('Entered ' + process.env.NODE_ENV.black.bgYellow + ' mode...')
} else {
  throw(new Error('[Error] no NODE_ENV specified or NODE_ENV is corrupt. Please do $export NODE_ENV=%mode% and specify \'production\' or \'development\' as %mode%'))
}
