'use strict'

const mongoose = require('mongoose');
const Content = require('../../models/content.js')

const access = require('../../middlewares/access.js');

const isLoggedIn = access.isLoggedIn;
const isAdmin = access.isAdmin;

function submitContents(contents) {
  return new Promise((resolve, reject) => {
    contents.forEach((content, i) => {
      let newContent = new Content();
      newContent.name = content.name;
      newContent.header = content.header;
      newContent.text = content.text.replace(/\r?\n/g, '<br />');
      Content.findOne({name: content.name}, (err, _content) => {
        if (err) {
          reject(err);
        } 
        if (_content) {
          Content.remove({_id: _content._id}, (err, query) => {
            if (err) {
              reject(err);
            }
            newContent.save(err => {
              if (err) {
                reject(err);
              }
              if (i === contents.length - 1) {
                resolve('done');
              }
            });
          });
        }
      });
    });
  });
}

module.exports = app => {
  app.post('/submitcontent', isLoggedIn, isAdmin, (req, res) => {
    let contents = []
    Object.keys(req.body).forEach(key => {
      req.body[key].name = key;
      contents.push(req.body[key]);
    });
    submitContents(contents)
      .then(
        result => res.send(result),
        error => console.err(error)
      )
  });
}
