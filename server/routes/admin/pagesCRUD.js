'use strict'

const mongoose = require('mongoose');
const Content = require('../../models/content.js')

const access = require('../../middlewares/access.js');

const isLoggedIn = access.isLoggedIn;
const isAdmin = access.isAdmin;

module.exports = app => {
  app.post('/submitcontent', isLoggedIn, isAdmin, (req, res) => {
      let newContent = new Content();
      newContent.name = 'introSection';
      newContent.header = req.body.introHeader;
      let text = req.body.introText.replace(/\r?\n/g, '<br />');
      newContent.text = text;
      let newContent2 = new Content();
      newContent2.name = 'reliabilitySection';
      newContent2.header = req.body.reliabilityHeader;
      text = req.body.reliabilityText.replace(/\r?\n/g, '<br />');
      newContent2.text = text;
      Content.remove({}, err => {
        if (err) {
          throw err;
        }
        newContent.save(err => {
          if (err) {
            throw err;
          }
        });
        newContent2.save(err => {
          if (err) {
            throw err;
          }
        });
      });
    res.sendStatus(200);
  });
}
