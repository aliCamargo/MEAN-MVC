var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('express-namespace')

require('./config/db');

var app = express();

//--- Setup sub domain
app.use( require('./middleware/subdomain')({
  // removeWWW : true,
  ignoreWWW : true
}));


app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app', 'views') );

//--load routes
require('./config/routes')(app, express);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(req.subdomains.reverse()[0] == 'api'){
    res.json({
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    });
  }else{
    res.render('errors/index', {
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    });
  }

});


module.exports = app;
