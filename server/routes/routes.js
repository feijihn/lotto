'use strict';
var Round = require('../models/rounds.js');
var Message = require('../models/message.js');
var Ticket = require('../models/tickets.js');
var User = require('../models/user.js');
var Content = require('../models/content.js');
var mongoose = require('mongoose');
var roundLogic = require('../roundLogic.js');
var path = require('path');
var fs = require('fs');


module.exports = function(app, passport) {
  require('./admin/productsCRUD.js')(app);
  require('./admin/pagesCRUD.js')(app);
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', (req, res) => {
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
  app.get('/vendor.bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../public/build/vendor.bundle.js'));
  })
  app.get('/client.bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../public/build/client.bundle.js'));
  })
  app.get('/admin.bundle.js', (req, res) => {
    res.sendFile(path.resolve( __dirname + '/../../public/build/admin.bundle.js'));
  })
  app.get('/vendor.bundle.js.map', (req, res) => {
    res.sendFile(path.resolve( __dirname + '/../../public/build/vendor.bundle.js.map'));
  })
  app.get('/client.bundle.js.map', (req, res) => {
    res.sendFile(path.resolve( __dirname + '/../../public/build/client.bundle.js.map'));
  })
  app.get('/admin.bundle.js.map', (req, res) => {
    res.sendFile(path.resolve( __dirname + '/../../public/build/admin.bundle.js.map'));
  })
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
  app.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup.pug', {message: req.flash('signupMessage')});
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
  app.get('/product', isLoggedIn, (req, res) => {
    res.render('main.pug');
  });
  app.get('/userinfo', isLoggedIn, (req, res) => {
    res.json(req.user);
  });
  // =====================================
  // ADMINISTRATION ======================
  // =====================================
  app.get('/admin', (req, res) => {
    res.render('admin.pug', {message: req.flash('adminMessage')});
  });
  app.post('/admin', passport.authenticate('local-admin-login', {
    successRedirect: '/admin-panel',
    failureRedirect: '/admin',
    failureFlash: true
  }));
  app.get('/admin-panel', isLoggedIn, isAdmin, (req, res) => {
    res.render('admin-panel.pug');
  });
  app.get('/admin-panel/*', isLoggedIn, isAdmin, (req, res) => {
    res.render('admin-panel.pug');
  });
  app.post('/uploadimage', (req, res) => {
  });
  app.post('/checkround', (req, res) => {
    Round.findOne({publicId: req.body.roundId}, (err, round) => {
      if (err) {
        throw err;
      }
      if (round.endTime) {
        roundLogic.checkDate(Number(round.endTime))
        .then(
          result => {
            clearInterval(result[2]);
            let response = {
              status: 'OK',
              data: result
            }
            res.send(response);
          }
        )
      } else {
        let response = {
          status: 'NOTFINISHED'
        }
        res.send(response);
      }
    })
  });
  app.post('/checkdate', (req, res) => {
    roundLogic.checkDate(Number(req.body.date))
    .then(
      result => {
        clearInterval(result[2]);
        res.send(result);
      }
    )
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
  app.get('/content', (req, res) => {
    Content.find((err, content) => {
      if (err) {
        throw err;
      }
      res.json(content);
      return undefined;
    });
  });
  app.post('/alertread', isLoggedIn, (req, res) => {
    User.update({'messages._id': req.body.alertId}, {$set: {'messages.$.status': 'read'}}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(user);
    });
    res.json(req.user);
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
    res.sendStatus(200);
  });
  app.get('/rounds', (req, res) => {
    Round.findOne({product_id: req.query.prodId, startTime: {$ne: undefined}}, (err, round) => {
      if (err) {
        throw err;
      }
      if ((round && (round.winnum === undefined || round.endTime === undefined)) || (req.body.options && req.body.options.all)) {
        res.json(round);
      } else {
        res.redirect('/');
      }
    });
  });
  app.get('/roundbyid', (req, res) => {
    Round.findById(req.query.roundId, (err, round) => {
      if (err) {
        throw err;
      }
      res.json(round);
    });
  });
  app.get('/roundsarchive', isLoggedIn, (req, res) => {
    Round.find({participants: {$in: [String(req.user._id)]}}, (err, rounds) => {
      if (err) {
        throw err;
      }
      res.json(rounds);
    });
  });
  app.get('/tickets', (req, res) => {
    roundLogic.checkRoundEnd(req.query.roundId);
    Ticket.find({round_id: req.query.roundId}, (err, ticket) => {
      if (err) {
        throw err;
      }
      Round.findOne({_id: req.query.roundId}, (err, round) => {
        if (err) {
          throw err;
        }
        if (round && round.tickets.length < 100) {
          if(req.body.ticketsCount === round.tickets.length) {
            res.json({
              state: 'NOTMODIFIED'
            })
          } else {
            res.json({
              state: 'MODIFIED',
              tickets: ticket
            });
          }
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
  app.post('/owntickets', isLoggedIn, (req, res) => {
    console.log(req.body);
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
    successRedirect: '/',
    failureRedirect: '/'
  }));
  // =====================================
  // VK ROUTES ===========================
  // =====================================
  app.get('/auth/vkontakte', passport.authenticate('vkontakte', {scope: ['email']}), req => {
  });

  // handle the callback after vk given the auth
  app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/'
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
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
