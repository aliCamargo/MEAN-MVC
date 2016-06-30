/**
 * Created by alicamargo on 26/06/16.
 */

var _ = require('underscore'),

    //-- create custom structure for attributes and sub attributes
    process_attributes = function(attributes){
        var collection_attr = {};
        collection_attr['functions'] = [];
        var obj_attr = [];

        //--- refactor attributes (find nested and custom params)
        _.each(attributes, function(attr){

            if( typeof attr == 'object' ){
                var key = _.keys(attr)[0];

                if( typeof attr[key] == 'function' ){//-- Set a custom params
                    collection_attr['functions'].push( {'name': key, 'function': attr[key], 'params': attr.params });
                }
                else{ //-- Set nested attributes
                    obj_attr.push(key.split('_')[0]);
                    collection_attr[key] = process_attributes(attr[key]);
                }
            }else{//-- Set default attributes
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
        //-- pick only serializer attributes
        object = _.pick( object, function(value, key) {
            return _.contains(attrs, key);
        });

        //---  add custom attributes to a object
        if( attributes['functions'].length ){
            _.each(attributes['functions'], function(obj){
                object[obj.name] = obj.function(object, obj.params);
            });
        }

        //-- serialize nested attributes
        _.each(object, function(value, key){
            var key_attr = key + '_attributes';
            if(typeof attributes[key_attr] == 'object' ){
                object[key] = serialize(object[key], attributes[key_attr]);
            }
        });

        return object;
    };


module.exports = function(object, attributes) {
    if( _.isArray(attributes) ){
        return serialize(object, process_attributes(attributes));
    }else{
        console.error("Serializer: Invalid attributes");
        return {};
    }
};