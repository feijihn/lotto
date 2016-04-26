'use strict';
// app/routes.js
var Product = require('../models/product.js');
var Round = require('../models/rounds.js');
var Message = require('../models/message.js');
var Ticket = require('../models/tickets.js');
var User = require('../models/user.js');
var mongoose = require('mongoose');
var roundLogic = require('../roundLogic.js');

module.exports = function(app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', (req, res) => {
    res.render('main.pug'); // load the index.ejs file
  });
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login.pug', {message: req.flash('loginMessage')});
  });
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/main', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup.pug', {message: req.flash('signupMessage')});
  });
  // process the signup form
  // app.post('/signup', do all our passport stuff here);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/main', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/main', (req, res) => {
    res.render('main.pug');
  });
  app.get('/product', isLoggedIn, (req, res) => {
    res.render('main.pug');
  });
  app.get('/userinfo', isLoggedIn, (req, res) => {
    res.send(req.user);
  });
  // =====================================
  // ADMINISTRATION ======================
  // =====================================
  app.get('/admin', (req, res) => {
    res.render('admin.pug', {message: req.flash('adminMessage')});
  });
  app.post('/admin', passport.authenticate('local-admin-login', {
    successRedirect: '/admin-panel',
    failureRedirect: '/',
    failureFlash: true
  }));
  app.get('/admin-panel', isLoggedIn, isAdmin, (req, res) => {
    res.render('admin-panel.pug');
  });
  app.post('/addproduct', isLoggedIn, isAdmin, (req, res) => {
    let newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.category = 0;
    newProduct.image = req.body.imagelink;
    newProduct.save(err => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added product...');
  });
  app.post('/claimticket', (req, res) => {
    let newTicket = new Ticket();
    newTicket.save(err => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added ticket...');
  });
  app.post('/alertread', isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.query);
    User.update({'messages._id': req.body.alertId}, {$set: {'messages.$.status': 'read'}}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(user);
    });
    res.send(req.user);
  });
  app.post('/addround', isLoggedIn, isAdmin, (req, res) => {
    let newRound = new Round();
    newRound.product_id = req.body.prodId;
    newRound.description = req.body.description;
    newRound.image = req.body.imagelink;
    newRound.creationTime = Date.now();
    newRound.startTime = Date.now();
    newRound.running = true;
    newRound.save(err => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added round...');
  });
  app.get('/products', (req, res) => {
    Product.find((err, product) => {
      if (err) {
        throw err;
      }
      res.json(product);
      return undefined;
    });
  });
  app.get('/rounds', (req, res) => {
    Round.find({product_id: req.query.prodId, endTime: {$eq: undefined}, startTime: {$ne: undefined}}, (err, round) => {
      if (err) {
        throw err;
      }
      res.json(round);
      return undefined;
    });
  });
  app.get('/roundsarchive', isLoggedIn, (req, res) => {
    Round.find({participants: {$in: [String(req.user._id)]}}, (err, rounds) => {
      if (err) {
        throw err;
      }
      console.log(rounds);
      res.json(rounds);
    });
  });
  app.get('/tickets', (req, res) => {
    roundLogic.checkRoundEnd(req.query.rndId);
    Ticket.find({round_id: req.query.rndId}, (err, ticket) => {
      if (err) {
        throw err;
      }
      Round.findOne({_id: req.query.rndId}, (err, round) => {
        if (err) {
          throw err;
        }
        if (round && round.tickets.length < 100) {
          res.send({
            state: 'INPROG',
            tickets: ticket
          });
        } else if (round) {
          res.send({
            state: 'FINISH',
            tickets: ticket,
            winnum: round.winnum
          });
        }
      });
      return undefined;
    });
  });
  app.post('/owntickets', isLoggedIn, (req, res) => {
    if (req.body.values) {
      roundLogic.addParticipant(req.body.rndId, req.user._id);
      req.body.values.forEach((value, i) => {
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
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/main',
    failureRedirect: '/'
  }));
  // =====================================
  // VK ROUTES ===========================
  // =====================================
  app.get('/auth/vkontakte', passport.authenticate('vkontakte', {scope: ['email']}), req => {
    console.log(req);
  });

  // handle the callback after vk given the auth
  app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/'
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
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
