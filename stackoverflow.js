    var mongoose = require('mongoose')
            , Schema = mongoose.Schema
            , ObjectId = Schema.ObjectId
            , randtoken = require('rand-token')
            , bcrypt = require("bcryptjs");

    var userSchema = new Schema({
    //  _Id: objectId,
        social_id: {
            type: String, //(Social id of facebook/twitter)
            required: false,
            unique: false
        },
        social_media: {
            type: String, //(facebook/twitter)
            required: false,
            unique: false
        },
        link_id: {
            type: String, //will be dispalying as user reference in url
            required: true,
            unique: true
        },
        nick_name: {
            type: String, // Unique Nickname for signup
            required: true,
            unique: true
        },
        email: {
            type: String, // Unqiue Email for signup
            required: true,
            unique: true
        },
        password: {
            type: String, // Password
            required: true,
            select: false
        },
        user_type: {
            type: Number, // 1: SuperAdmin, 2: Admin, 3: SiteUser, 4: Restaurant
            required: true
        }, //reason_to_close: String, // Close Account
        is_active: {
            type: Number, // -1: pending to activation, 0: inactive, 1: active, 
            required: true
        },
        is_close: {
            type: Number, // -1: pending to close/Undecided, 0: closed , 1: open/ not close, 
            required: true
        },
        is_online: {
            type: Number, // 0: Offline, 1: Online
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }, // Registration date
        updated_at: {
            type: Date, // Registration activation date / user update date
            default: Date.now
        }
    }, {collection: 'user'});

    // Password verification
    userSchema.methods.validPassword = function (candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            console.log(err);
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        });
    };

    var User = module.exports = mongoose.model("User", userSchema);

    module.exports.checkEmail = function (callback) {
        return this.model('User').count({email: this.email}, callback);
    };

    module.exports.validateEmailOrNickname = function (username, callback) {
        var orCondition = [{nick_name: username}, {email: username}];
        //return this.model("user").findOne().or(orCondition);
        return this.model("User").find({$or: orCondition}, callback);
    };

    module.exports.getUserById = function (id) {
        User.findById(id, callback);
    };

    module.exports.createUser = function (user, callback) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                user.save(callback);
            });
        });
    };
