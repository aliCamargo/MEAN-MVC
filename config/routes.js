/**
 * Created by alicamargo on 6/21/16.
 */

require('./boot'); //-- Load controllers
var auth = require('./../middleware/auth');

module.exports = function(app, express){

    /*
     * APP routers
     * */
    //-- root path
    app.get('/', MainController.index);

    //-- users paths
    app.get('/users', UsersController.list);

    //-- pets paths
    app.get('/pets', PetsController.list);

    //-- examples
    // app.get('/user/:user_id/show', users.show);
    // app.get('/user/show', users.show);
    // app.get('/user/show', users.show);


    /*
    * API routers
    * */
    app.namespace('/api', function(){
        //-- auth paths
        app.post('/register', api.AuthenticationController.register);
        app.post('/login', api.AuthenticationController.login);
    });

    app.namespace('/api', auth, function(){
        //-- root path
        app.get('/', api.ApiController.index);

        //-- users paths
        app.get('/users', api.UsersController.list);
        // app.get('/user/:id', api.UsersController.get_user, api.users.show);
        app.post('/users', api.UsersController.create);
        app.get('/user/:id', api.UsersController.show);
        app.put('/user/:id', api.UsersController.update);
        app.delete('/user/:id', api.UsersController.destroy);

        //-- pets paths
        app.get('/pets', api.PetsController.list);
        app.get('/pets/:id', api.PetsController.show);
        app.post('/pets', api.PetsController.create);
        app.put('/pet/:id', api.PetsController.update);
        app.delete('/pets/:id', api.PetsController.destroy);
    });

};
