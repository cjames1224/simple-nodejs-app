var express = require('express');
var path = require('path');
var logger = require('morgan');
var index = require('./routes/index');
var app = express();
var redisService = require('./services/redis')

require('dotenv').config();

var redis = require('redis')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

const client = redis.createClient({
  username: 'default',
  password: process.env.redisPassword,
  socket: {
      host: process.env.redisHost,
      port: 16192
  }
});

client.on('error', err => console.log('Redis Client Error', err));

redisService.startupClient(client);

// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});



module.exports = app;
