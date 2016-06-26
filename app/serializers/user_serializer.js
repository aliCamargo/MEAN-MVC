/**
 * Created by alicamargo on 6/25/16.
 */
'use strict';

module.exports.simpleUser = function(_users){
    Serialize(_users, {
        only: ['name', 'surname'],
        has_many: ['pets']
    })
};