'use strict';
// app/routes.js
var Product = require('../models/product.js');
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
    newProduct.save((err) => {
      if (err) throw err;
    })
    res.status(200).send('OK');
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
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}
function isAdmin(req, res, next) {
  if (req.user && req.user.local.accessLevel === 9)
    return next();
  else
    res.status(401).send('Unauthorized');
};
