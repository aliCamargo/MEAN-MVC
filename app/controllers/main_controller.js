/**
 * Created by alicamargo on 6/21/16.
 */
exports.index = function(req, res, next){
    res.render('index', { title: 'Node.js MVC' });
};