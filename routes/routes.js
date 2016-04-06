'use strict';
// app/routes.js
var Product = require('../models/product.js');
var Round = require('../models/rounds.js');
var Ticket = require('../models/tickets.js');
var mongoose = require('mongoose');

module.exports = function(app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', (req, res) => {
    res.render('index.pug'); // load the index.ejs file
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
    successRedirect: '/profile', // redirect to the secure profile section
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
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.pug');
  });
  app.get('/product', isLoggedIn, (req, res) => {
    res.render('profile.pug');
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
  app.post('/claimticket', isLoggedIn, (req, res) => {
    let newTicket = new Ticket();
    newTicket.save(err => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added ticket...');
  });
  app.post('/addround', isLoggedIn, isAdmin, (req, res) => {
    let newRound = new Round();
    newRound.product_id = req.body.prodId;
    newRound.description = req.body.description;
    newRound.image = req.body.imagelink;
    newRound.startTime = Date.now();
    newRound.save(err => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send('Added round...');
  });
  app.get('/products', isLoggedIn, (req, res) => {
    Product.find((err, product) => {
      if (err) {
        throw err;
      }
      res.json(product);
      return undefined;
    });
  });
  app.get('/rounds', isLoggedIn, (req, res) => {
    Round.find({product_id: req.query.prodId, running: true}, (err, round) => {
      if (err) {
        throw err;
      }
      res.json(round);
      return undefined;
    });
  });
  app.get('/tickets', isLoggedIn, (req, res) => {
    Ticket.find({round_id: req.query.rndId}, (err, ticket) => {
      if (err) {
        throw err;
      }
      res.json(ticket);
      return undefined;
    });
  });
  app.post('/owntickets', isLoggedIn, (req, res) => {
    let resFlag = true;
    if (req.body.values) {
      req.body.values.forEach((value, i) => {
        let newTicket = new Ticket();
        newTicket.round_id = req.body.rndId;
        newTicket.user_id = req.user._id;
        newTicket.value = value;
        newTicket.save(err => {
          if (err) {
            throw err;
          }
        });
        Round.findByIdAndUpdate({_id: req.body.rndId, ticketsOwned: {$lt: 100}}, {$inc: {ticketsOwned: 1}}, (err, round) => {
          if (err) {
            throw err;
          }
          if (round.ticketsOwned === 99) {
            resFlag = false;
            console.log('round ' + round._id + 'finished');
            let winner = Math.floor(Math.random() * 100);
            console.log('ticket #' + winner + ' winning the round!');
            res.status(200).json({
              status: 'FINISH',
              winnum: winner
            });
            let newRound = new Round();
            console.log('creating new same round...');
            newRound.product_id = round.product_id;
            newRound.description = round.description;
            newRound.image = round.image;
            newRound.startTime = Date.now();
            console.log('old round closing and new starting in 10 seconds...');
            setTimeout(() => {
              Round.remove({_id: req.body.rndId}, err => {
                if (err) {
                  throw err;
                }
                console.log('removed round ' + req.body.rndId);
                newRound.save(err => {
                  if (err) {
                    throw err;
                  }
                  console.log('new round saved');
                });
              });
            }, 10000);
          }
          if (resFlag && i === req.body.values.length - 1) {
            res.status(200).json({
              status: 'OK'
            });
            resFlag = !resFlag;
          }
        });
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
    successRedirect: '/profile',
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
    res.redirect('/profile');
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
