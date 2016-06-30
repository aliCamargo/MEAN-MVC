/**
 * Created by alicamargo on 6/25/16.
 */
'use strict';
var Serializer = require('./../../lib/serializer');

exports.simpleUser = function(_users, current_user_id){
    /*
    * object [its a current object]
    * params [its a params inject on function]
    * */
    var custom_attribute = function(object, params ){
        return "param -> " + object.hobbies  + ' --- ' + params.current_user_id;
    };

    return Serializer( _users, [
        '_id', 'name', 'surname',
        {'custom_attribute': custom_attribute, 'params': {'current_user_id': current_user_id} },
        { 'pets_attributes': [ '_id', 'name', {'custom_attribute': custom_attribute, 'params': {'current_user_id': current_user_id} }] }
    ])
};

exports.loginUser = function(_users){
    return Serializer( _users, ['_id', 'username', 'name', 'surname'])
};