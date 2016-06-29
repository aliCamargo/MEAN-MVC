/**
 * Created by alicamargo on 6/28/16.
 */

var passport = require('passport');

exports.register = function(req, res, next){
    var user_params = req.body.user;

    if(!user_params.name || !user_params.username || !user_params.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    var user = new User(user_params);

    user.save(function(err) {
        var token;
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            });
        }
    });
};

exports.login = function(req, res, next){
    var user_params = req.body.user;
    req.user = req.body.user
    if( !user_params.username || !user_params.password ) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info){
        var token;
        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        if(user){
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                token   : token,
                user    : UserSerializer.loginUser( user )
            });
        } else {
            sendJsonResponse(res, 401, info);
        }
    })(req, res);

};