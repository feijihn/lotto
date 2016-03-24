
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
			username		:	{type:String, default: ''},
        email        : {type:String, default: ''},
        password     : {type:String},
    },
    facebook         : {
			id           : {type:String, default: ''},
        token        : {type:String, default: ''},
        fullname         : {type:String, default: ''},
    },
		vk							  : {
			id: {type:String, default: ''},
				token: {type:String, default: ''},
				fullname: {type:String, default: ''},
		}

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
