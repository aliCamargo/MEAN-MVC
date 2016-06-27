/**
 * Created by alicamargo on 6/25/16.
 */
'use strict';
var Serializer = require('./../../lib/serializer');

exports.simpleUser = function(_users){
    return Serializer( _users, {
        attributes: ['_id', 'name', 'surname', { 'pets_attributes': [ '_id', 'name' ] } ]
    })
};