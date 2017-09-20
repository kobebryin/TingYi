var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');
/** -----  database MySql api routes  -----*/
var bbsapi = require('./routes/bbsApi');
var dishapi = require('./routes/dishApi');
var dishlistapi = require('./routes/dishlistApi');
var fieldvalueapi = require('./routes/fieldvalueApi');
var fieldvalueAttrib05api = require('./routes/fieldvalueAttrib05');
var fieldvalueAttrib08api = require('./routes/fieldvalueAttrib08');
var fieldvalueDishList = require('./routes/fieldvalueDishList');
var fieldvalueMeal14 = require('./routes/fieldvalueMeal14');
var fieldvalueMeal15 = require('./routes/fieldvalueMeal15');
var fieldvalueMeal21 = require('./routes/fieldvalueMeal21');
var mealapi = require('./routes/mealApi');
var memberapi = require('./routes/memberApi');
var routeapi = require('./routes/routeApi');
var saleslistapi = require('./routes/saleslistApi');
var memberoneapi = require('./routes/memberOneApi');

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

/** -------------------------connect MySQL-----------------------START----- */
var connection = mysql.createConnection({
    host: 'tingyinas.myqnapcloud.com',
    user: 'kobebryin',
    password: 'ilove5205><',
    database: 'TingYi'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
/** -------------------------connect MySQL-----------------------END------ */

/* Add MySQL connection into req.dbConnection Object */
app.use(function(req, res, next) {
    req.dbConnection = connection;
    next();
});

app.use('/', index);
/** -----  database MySql api routes  -----*/
app.use('/bbs', bbsapi);
app.use('/dish', dishapi);
app.use('/dishlist', dishlistapi);
app.use('/fieldvalue',fieldvalueapi);
app.use('/fieldvalueAttrib05',fieldvalueAttrib05api);
app.use('/fieldvalueAttrib08',fieldvalueAttrib08api);
app.use('/fieldvalueDishList',fieldvalueDishList);
app.use('/fieldvalueMeal14',fieldvalueMeal14);
app.use('/fieldvalueMeal15',fieldvalueMeal15);
app.use('/fieldvalueMeal21',fieldvalueMeal21);
app.use('/meal',mealapi);
app.use('/member', memberapi);
app.use('/route', routeapi);
app.use('/saleslist', saleslistapi);
app.use('/memberOne', memberoneapi);
app.use('/users', users);

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
