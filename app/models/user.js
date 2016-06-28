/**
 * Created by alicamargo on 6/24/16.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema(
    {
        name        : {type: String, required: true},
        surname     : String,
        username    : {type: String, required: true, unique: true},
        password    : {type: String, required: true},
        salt        : String,
        hobbies     : [String],
        pets        : [{type : mongoose.Schema.ObjectId, ref : 'Pet'}]
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
//-- Set a password encrypted
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

//-- Compare passwords encrypted (Login)
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.password === hash;
};

//-- encrypt password
userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.setPassword(user.password);
    next();
});

//-- Generate JSON Web Token
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET );
};

var User = module.exports = mongoose.model('User', userSchema);

module.exports.showUser = function(id, callback) {
    User.findById(id, callback);
};

module.exports.listUsers = function(query, callback) {
    User.find(query, callback).populate('pets');
};

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.createUser = function(params, callback){
    User.create(params, callback)
};

module.exports.deleteUser = function(id, callback){
    User.findByIdAndRemove(id, callback);
};

module.exports.updateUser = function(id, params, callback){
    User.findByIdAndUpdate(id, { $set: params}, callback);
};