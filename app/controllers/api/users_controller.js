/**
 * Created by alicamargo on 6/21/16.
 */

exports.get_user = function(req, res, next){
    var id = req.params.id;
    if (!id) return next();
    // pretend to query a database...
    process.nextTick(function(){
        User.showUser(id, function (_error, _user) {
            req.user = _user;
            // cant find that user
            if (!req.user) return next('route');
            // found it, move on to the routes
            next();

        });

    });
};

exports.list = function(req, res, next){
    // console.log(User)
    User.listUsers({}, function (_error, _users) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            console.log(_users);
            sendJsonResponse(res, 200, { users: _users } );
        }
    });

};

exports.show = function(req, res, next){
    User.showUser(id, function (_error, _user) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'user not found', error: _error });
        }else{
            sendJsonResponse(res, 200, { user: _user } );
        }
    });
};

exports.create = function(req, res, next){
    User.createUser( req.body.user, function (_error, _user) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            sendJsonResponse(res, 201, { message: 'saved!', user: _user } );
        }
    });
};

exports.update = function(req, res, next){
    User.updateUser( req.params.id, req.body.user, function (_error, _user) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            sendJsonResponse(res, 201, { message: 'saved!', user: _user } );
        }
    });
};

exports.destroy = function(req, res, next){
    User.deleteUser( req.params.id, function (_error, _user) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            sendJsonResponse(res, 201, { message: 'removed!', user: _user} );
        }
    });
};
