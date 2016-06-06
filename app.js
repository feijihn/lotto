// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || process.env.$PORT; //3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fallback = require('express-history-api-fallback');
var fileUpload = require('express-fileupload');

var configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// require('./webpack.dev.js')(app);
(function() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    console.log('running webpack middleware...');
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
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
      log: console.log,
      heartbeat: 10 * 1000
    }));
  }
})();
app.set('view engine', 'pug');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use('/public', express.static('public'));
app.use(session({secret: '4kyldysh20'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(fallback(__dirname + './views/main.pug'));

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Dev server listening on ' + port);
