/**
 * Created by alicamargo on 6/21/16.
 */

global.sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

exports.index = function(req, res, next){
    sendJsonResponse(res, 200, {status: 'success', message: 'Welcome to our API!'});
};