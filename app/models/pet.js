/**
 * Created by alicamargo on 6/24/16.
 */


var mongoose = require('mongoose');
var petSchema = mongoose.Schema(
    {
        name        : { type: String, required: true },
        date_bird   : { type: Date, required: true }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

var Pet = module.exports = mongoose.model('Pet', petSchema);

module.exports.showPet = function(id, callback) {
    Pet.findById(id, callback);
};

module.exports.listPets = function(query, callback) {
    Pet.find(query, callback);
};

module.exports.createPet = function(params, callback){
    Pet.create(params, callback)
};

module.exports.deletePet = function(id, callback){
    Pet.findByIdAndRemove(id, callback)
};

module.exports.updatePet = function(id, params, callback){
    Pet.findByIdAndUpdate(id, { $set: params}, callback)
};