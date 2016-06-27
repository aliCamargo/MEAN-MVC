/**
 * Created by alicamargo on 26/06/16.
 */

var _ = require('underscore'),

    //-- create custom structure for attributes and sub attributes
    process_attributes = function(attributes){
        var collection_attr = {};
        var obj_attr = [];

        _.each(attributes, function(attr){
            if( typeof attr == 'object' ){
                var key = _.keys(attr)[0];
                obj_attr.push(key.split('_')[0]);
                collection_attr[key] = process_attributes(attr[key]);
            }else{
                obj_attr.push(attr);
            }

            collection_attr['attributes'] = obj_attr;
        });

        return collection_attr;
    },

    //-- map object if is array
    serialize = function(object, attributes){
        if( _.isArray(object) ){
            return _.map(object, function(obj){ return pick(obj, attributes) });
        }else{
            return pick(object, attributes);
        }
    },

    //-- pick a specific attributes
    pick = function(object, attributes){

        var attrs = attributes.attributes
        object = _.pick( object, function(value, key) {
            return _.contains(attrs, key);
        });

        _.each(object, function(value, key){
            var key_attr = key + '_attributes';
            if(typeof attributes[key_attr] == 'object' ){
                object[key] = serialize(object[key], attributes[key_attr]);
            }
        });

        return object;
    };


module.exports = function(object, options) {
    var object_serialise = {};
    if(options.attributes){
        object_serialise = serialize(object, process_attributes(options.attributes));
    }

    return object_serialise;
};