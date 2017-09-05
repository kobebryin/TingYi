var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//var users = require('./routes/users');
/** -----  database MySql api routes  -----*/
var bbsapi = require('./routes/bbsApi');
var dishapi = require('./routes/dishApi');
var dishlistapi = require('./routes/dishlistApi');
var fieldvalueapi = require('./routes/fieldvalueApi');
var mealapi = require('./routes/mealApi');
var memberapi = require('./routes/memberApi');
var routeapi = require('./routes/routeApi');
var saleslistapi = require('./routes/saleslistApi');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
/** -----  database MySql api routes  -----*/
app.use('/bbs', bbsapi);
app.use('/dish', dishapi);
app.use('/dishlist', dishlistapi);
app.use('/fieldvalue',fieldvalueapi);
app.use('/meal',mealapi);
app.use('/member', memberapi);
app.use('/route', routeapi);
app.use('/saleslist', saleslistapi);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
