'use strict'

const mongoose = require('mongoose');
const Product = require('../../models/product.js');
const Round = require('../../models/rounds.js');

const multer  = require('multer');
const upload = multer();

const access = require('../../middlewares/access.js');

const isLoggedIn = access.isLoggedIn;
const isAdmin = access.isAdmin;

module.exports = app => {

  // CREATE ========= //
  app.post('/submitproduct', isLoggedIn, isAdmin, upload.single('picture'), (req, res) => {
    console.log(req.file);
    let newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.category = 0;
    newProduct.image.data = req.file.buffer;
    newProduct.image.contentType = req.file.mimetype;
    let initialRound = new Round();
    initialRound.product_id = newProduct._id;
    initialRound.description = '';
    initialRound.publicId = String(initialRound._id).substr(0, 5);
    initialRound.creationTime = Date.now();
    initialRound.startTime = Date.now();
    newProduct.save(err => {
      if (err) {
        throw err;
      }
      initialRound.save(err => {
        if (err) {
          throw err;
        }
      })
    });
    res.json(newProduct);
  });

  // READ ========= //
  app.get('/products', (req, res) => {
    Product.find((err, product) => {
      if (err) {
        throw err;
      }
      res.json(product);
      return undefined;
    });
  });
    //Product pic ==
  app.get('/productpic/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
      if (err) {
        throw err;
      }
      res.contentType(product.image.contentType);
      res.send(product.image.data);
    })
  });

  // UPDATE ========= //
  app.post('/editproduct', isLoggedIn, isAdmin, upload.single('picture'), (req, res) => {
    Product.findById(req.body.productId, (err, product) => {
      let newName = req.body.name || product.name;
      let newPrice = req.body.price || product.price;
      let newDescription = req.body.description || product.description;
      let newImage = req.file.path || product.image;
      product.update({$set: {name: newName, price: newPrice, description: newDescription, image: newImage}}, (err, query) => {
        if (err) {
          throw err;
        }
      });
    });
  });

  // DELETE ========= //
  app.post('/removeproduct', isLoggedIn, isAdmin, (req, res) => {
    Product.remove({_id: req.body.productId}, (err, status) => {
      if (err) {
        throw err;
      }
      Product.find((err, products) => {
        if (err) {
          throw err;
        }
        res.json(products);
      })
    })
  });
}
