'use strict';
// app/routes.js

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _routes = require('../app/routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = require('../models/product.js');
var Round = require('../models/rounds.js');
var Message = require('../models/message.js');
var Ticket = require('../models/tickets.js');
var User = require('../models/user.js');
var Content = require('../models/content.js');
var mongoose = require('mongoose');
var roundLogic = require('../roundLogic.js');
var path = require('path');
var fs = require('fs');

//var App = require('../app/index.js');

module.exports = function (app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function (req, res) {
    res.render('main.pug'); // load the index.ejs file
  });
  // =====================================
  // REACT ROUTER SERVER-SIDE URL HANDLING
  // ===========(the easy way)============
  // =====================================
  //app.get('*', (req, res) => {
  //var data = {};
  //var component = App({
  //path: req.path,
  //onSetTitle: title => data.title = title,
  //onPageNotFound: () => res.status(404)
  //});
  //data.body = React.renderToString(component);
  //var html = _.template(template, data);
  //res.send(html);
  //});
  //// =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/vendor.bundle.js', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/vendor.bundle.js'));
  });
  app.get('/client.bundle.js', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/client.bundle.js'));
  });
  app.get('/admin.bundle.js', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/admin.bundle.js'));
  });
  app.get('/vendor.bundle.js.map', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/vendor.bundle.js.map'));
  });
  app.get('/client.bundle.js.map', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/client.bundle.js.map'));
  });
  app.get('/admin.bundle.js.map', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/build/admin.bundle.js.map'));
  });
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.pug', { message: req.flash('signupMessage') });
  });
  // process the signup form
  // app.post('/signup', do all our passport stuff here);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/product', isLoggedIn, function (req, res) {
    res.render('main.pug');
  });
  app.get('/userinfo', isLoggedIn, function (req, res) {
    res.json(req.user);
  });
  // =====================================
  // ADMINISTRATION ======================
  // =====================================
  app.get('/admin', function (req, res) {
    res.render('admin.pug', { message: req.flash('adminMessage') });
  });
  app.post('/admin', passport.authenticate('local-admin-login', {
    successRedirect: '/admin-panel',
    failureRedirect: '/',
    failureFlash: true
  }));
  app.get('/admin-panel', isLoggedIn, isAdmin, function (req, res) {
    res.render('admin-panel.pug');
  });
  app.get('/admin-panel/*', isLoggedIn, isAdmin, function (req, res) {
    res.render('admin-panel.pug');
  });
  app.post('/uploadimage', function (req, res) {});
  app.post('/addproduct', isLoggedIn, isAdmin, function (req, res) {
    var newProduct = new Product();
    var sampleFile;

    if (!req.files) {
      res.send('Выберите файл изображения!');
      return;
    }

    sampleFile = req.files.picture;
    var imgPath = path.resolve(__dirname + '/../public/images/' + newProduct._id + '.jpg');
    var relPath = path.resolve('../../../../../../public/images/' + newProduct._id + '.jpg');
    sampleFile.mv(imgPath, function (err) {
      if (err) {
        res.status(500).send('Произошла ошибка при загрузке изображения' + err);
      }
    });
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.category = 0;
    newProduct.image = relPath;
    var initialRound = new Round();
    initialRound.product_id = newProduct._id;
    initialRound.description = '';
    initialRound.creationTime = Date.now();
    initialRound.startTime = Date.now();
    newProduct.save(function (err) {
      if (err) {
        throw err;
      }
      initialRound.save(function (err) {
        if (err) {
          throw err;
        }
      });
    });
    res.sendStatus(200);
  });
  app.post('/claimticket', function (req, res) {
    var newTicket = new Ticket();
    newTicket.save(function (err) {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added ticket...');
  });
  app.get('/content', function (req, res) {
    Content.find(function (err, content) {
      if (err) {
        throw err;
      }
      console.log(content);
      res.json(content);
      return undefined;
    });
  });
  app.post('/modify-content', isLoggedIn, isAdmin, function (req, res) {
    console.log(req.body);
    Object.keys(req.body).forEach(function (key, i, body) {
      var newContent = new Content();
      newContent.name = key;
      var text = req.body[key].replace(/\r?\n/g, '<br />');
      console.log(text);
      newContent.text = text;
      Content.remove({}, function (err) {
        if (err) {
          throw err;
        }
        newContent.save(function (err) {
          if (err) {
            throw err;
          }
        });
      });
    });
    res.sendStatus(200);
  });
  app.post('/alertread', isLoggedIn, function (req, res) {
    User.update({ 'messages._id': req.body.alertId }, { $set: { 'messages.$.status': 'read' } }, function (err, user) {
      if (err) {
        throw err;
      }
      console.log(user);
    });
    res.json(req.user);
  });
  app.post('/addround', isLoggedIn, isAdmin, function (req, res) {
    var newRound = new Round();
    newRound.product_id = req.body.prodId;
    newRound.description = req.body.description;
    newRound.image = req.body.imagelink;
    newRound.creationTime = Date.now();
    newRound.startTime = Date.now();
    newRound.running = true;
    newRound.save(function (err) {
      if (err) {
        throw err;
      }
    });
    res.sendStatus(200);
  });
  app.get('/products', function (req, res) {
    Product.find(function (err, product) {
      if (err) {
        throw err;
      }
      res.json(product);
      return undefined;
    });
  });
  app.get('/rounds', function (req, res) {
    Round.find({ product_id: req.query.prodId, startTime: { $ne: undefined } }, function (err, round) {
      if (err) {
        throw err;
      }
      if (round.winnum === undefined || round.endTime === undefined || res.body.options && res.body.options.all) {
        res.json(round);
      }
    });
  });
  app.get('/roundbyid', function (req, res) {
    Round.findById(req.query.roundId, function (err, round) {
      if (err) {
        throw err;
      }
      res.json(round);
    });
  });
  app.get('/roundsarchive', isLoggedIn, function (req, res) {
    Round.find({ participants: { $in: [String(req.user._id)] } }, function (err, rounds) {
      if (err) {
        throw err;
      }
      res.json(rounds);
    });
  });
  app.get('/tickets', function (req, res) {
    roundLogic.checkRoundEnd(req.query.rndId);
    Ticket.find({ round_id: req.query.rndId }, function (err, ticket) {
      if (err) {
        throw err;
      }
      Round.findOne({ _id: req.query.rndId }, function (err, round) {
        if (err) {
          throw err;
        }
        if (round && round.tickets.length < 100) {
          res.json({
            state: 'INPROG',
            tickets: ticket
          });
        } else if (round && round.winnum) {
          res.json({
            state: 'FINISH',
            tickets: ticket,
            winnum: round.winnum
          });
        } else if (round && round.endTime) {
          res.json({
            state: 'WAITING',
            tickets: ticket
          });
        }
      });
      return undefined;
    });
  });
  app.post('/owntickets', isLoggedIn, function (req, res) {
    if (req.body.values) {
      roundLogic.addParticipant(req.body.rndId, req.user._id);
      req.body.values.forEach(function (value, i) {
        roundLogic.ownTicket(req.body.rndId, req.user._id, value);
        if (i === req.body.values.length - 1) {
          res.status(200).json({
            status: 'OK'
          });
        }
      });
    } else {
      res.status(304).json({
        status: 'NOT MODIFIED'
      });
    }
  });
  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));
  // =====================================
  // VK ROUTES ===========================
  // =====================================
  app.get('/auth/vkontakte', passport.authenticate('vkontakte', { scope: ['email'] }), function (req) {});

  // handle the callback after vk given the auth
  app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/'
  }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
/** @namespace Middleware */
/**
 * middleware to ensure requesting user is logged in
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next fucntion for processing to next middleware
 * @return {Function} next()
 * @memberof Middleware
 */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}
/**
 * middleware to ensure requesting user has administrative rights
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next fucntion for processing to next middleware
 * @return {Function} next()
 * @memberof Middleware
 */
function isAdmin(req, res, next) {
  if (!req.user && !(req.user.local.accessLevel === 9)) {
    res.status(401).send('Unauthorized');
  } else {
    return next();
  }
}

