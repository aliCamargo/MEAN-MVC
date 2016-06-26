/**
 * Created by alicamargo on 6/24/16.
 */

var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        name        : {type: String, required: true},
        surname     : String,
        username    : {type: String, required: true, unique: true},
        password    : {type: String, required: true},
        hobbies     : [String],
        // location    : {type : mongoose.Schema.ObjectId, ref : 'Location'},
        pets        : [{type : mongoose.Schema.ObjectId, ref : 'Pet'}]
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

var User = module.exports = mongoose.model('User', userSchema);

module.exports.showUser = function(id, callback) {
    User.findById(id, callback);
};

module.exports.listUsers = function(query, callback) {
    User.find(query, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.createUser = function(params, callback){
    User.create(params, callback)
};

module.exports.deleteUser = function(id, callback){
    User.findByIdAndRemove(id, callback)
};

module.exports.updateUser = function(id, params, callback){
    User.findByIdAndUpdate(id, { $set: params}, callback)
};