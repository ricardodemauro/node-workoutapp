//tutorial http://www.codemag.com/article/1210041
var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    logger = require('./utils/logger.js'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var routes = require('./routes/index'),
    users = require('./routes/users'),
    workouts = require('./routes/workouts');

var app = express();

mongoose.connect('mongodb://localhost/workout_tracker');

app.disable('x-powered-by');
app.set('etag', false); // turn off

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


morgan.token('ip', function (req, res) {
  return req.headers['x-forwarede-for'] || req.connection.remoteAddress;
});
var morganLogLevel = app.get('env') == 'production' ? 'common' : ':ip :method :url :status :response-time ms - :res[content-length]' /*'dev'*/;
logger.debug('Overriding express logger');
app.use(morgan(morganLogLevel, {stream: logger.stream})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/workouts', workouts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
