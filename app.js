#!/usr/bin/env node

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var json2xls = require('json2xls');
var session = require('express-session');

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
var fieldvalueMeal0708 = require('./routes/fieldvalueMeal0708');
var mealapi = require('./routes/mealApi');
var memberapi = require('./routes/memberApi');
var memberForMeal = require('./routes/memberForMeal');
var memberForConditionMeal = require('./routes/memberForConditionMeal');
var memberForNormalMeal = require('./routes/memberForNormalMeal');
var routeapi = require('./routes/routeApi');
var saleslistapi = require('./routes/saleslistApi');
var searchMonthMealApi = require('./routes/searchMonthMealApi');
var searchConditionMealApi = require('./routes/searchConditionMealApi');
var memberoneapi = require('./routes/memberOneApi');
var reportApi = require('./routes/reportApi');
var reportAllApi = require('./routes/reportAllApi');
var exportExcelApi = require('./routes/exportExcelApi');

var app = express();

/**
 * Module dependencies.
 */

// var app = require('../app');
var debug = require('debug')('tingyi:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '319');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

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

// caching disabled for every route
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//設置session相關設定
app.use(session({
    secret: 'fuck you dont try to hack me you idiot',
    key:'sessionDataForTY',
    resave:true,
    saveUninitialized: true,
    cookie: { maxAge: 1200 * 1000 } //20分鐘到期
}));


/* Add MySQL connection into req.dbConnection Object */
app.use(function (req, res, next) {
    req.dbConnection = connection;
    next();
});

app.use('/', index);
/** -----  database MySql api routes  -----*/
app.use('/bbs', bbsapi);
app.use('/dish', dishapi);
app.use('/dishlist', dishlistapi);
app.use('/fieldvalue', fieldvalueapi);
app.use('/fieldvalueAttrib05', fieldvalueAttrib05api);
app.use('/fieldvalueAttrib08', fieldvalueAttrib08api);
app.use('/fieldvalueDishList', fieldvalueDishList);
app.use('/fieldvalueMeal14', fieldvalueMeal14);
app.use('/fieldvalueMeal15', fieldvalueMeal15);
app.use('/fieldvalueMeal21', fieldvalueMeal21);
app.use('/fieldvalueMeal0708', fieldvalueMeal0708);
app.use('/meal', mealapi);
app.use('/member', memberapi);
app.use('/memberForMeal', memberForMeal);
app.use('/memberForConditionMeal', memberForConditionMeal);
app.use('/memberForNormalMeal', memberForNormalMeal);
app.use('/route', routeapi);
app.use('/saleslist', saleslistapi);
app.use('/searchMonthMealApi', searchMonthMealApi);
app.use('/searchConditionMealApi', searchConditionMealApi);
app.use('/memberOne', memberoneapi);
app.use('/reportApi', reportApi);
app.use('/reportAllApi', reportAllApi);
app.use('/exportExcelApi', exportExcelApi);
app.use('/users', users);
app.use(json2xls.middleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
