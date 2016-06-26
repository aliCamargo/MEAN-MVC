/**
 * Created by alicamargo on 6/21/16.
 */

var fs = require('fs'),
    path = require('path'),
    camelCase = require('camelcase'),
    path_app = path.join(__dirname, '..', 'app');

var load_files = function(parent_path, parent_global) {
    //-- dynamically include routes (Controller)
    fs.readdirSync(parent_path).forEach(function (file) {
        if( fs.statSync( parent_path + '/' + file ).isDirectory() ){
            if(['controllers', 'models', 'serializer'].indexOf(file) > -1 ){
                load_files( parent_path + '/' + file, parent_global );
            }else{
                load_files( parent_path + '/' + file, parent_global[file] = {} );
            }
        }else if(file.indexOf('.js') > -1) {
            var file_name = camelCase( file.replace('.js', '') );
            file_name = file_name[0].toUpperCase() + file_name.slice(1);
            parent_global[file_name] = require( path.join(parent_path, file) );
        }
    });
};

module.exports = load_files(path_app, global);
// global.serializers = require('./../app/serializers');