
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Message = require('./message.js');

var schema = mongoose.Schema;
// define the schema for our user model
var userSchema = schema({
  local: {
    username: {type: String, default: ''},
    email: {type: String, default: ''},
    password: {type: String},
    accessLevel: {type: Number, default: 0}
  },
  facebook: {
    id: {type: String, default: ''},
    token: {type: String, default: ''},
    fullname: {type: String, default: ''}
  },
  vk: {
    id: {type: String, default: ''},
    token: {type: String, default: ''},
    fullname: {type: String, default: ''}
  },
  messages: [Message.schema]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
