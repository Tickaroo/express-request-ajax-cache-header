var _ = require('lodash');
var ajax = require('request-ajax');
var express = require('express');
var Backbone = require('backbone');
var ajaxCacheHeader = require('../../');

Backbone.ajax = ajax;
var app = express();

app.use(function(req, res, next) {
  // bind error handler to `res.locals`
  res.locals.setCacheByAPI = ajaxCacheHeader(req, res);
  res.locals.apiError = function() {
    res.send('api error');
  }
  next();
});

app.get('/', function(req, res, next){
  res.send('home');
});

app.get('/data', function(req, res, next){
  ajax({
    url: 'http://localhost:1235/data',
    accessToken: true,
    complete: res.locals.setCacheByAPI,
    error: function(){},
    success: function (data) {
      res.send('has data: ' + data.data);
    }
  });
});

app.get('/cached_data', function(req, res, next){
  ajax({
    url: 'http://localhost:1235/cached_data',
    accessToken: true,
    complete: res.locals.setCacheByAPI,
    error: function(){},
    success: function (data) {
      res.send('has data: ' + data.data);
    }
  });
});

app.get('/error', function(req, res, next){
  ajax({
    url: 'http://localhost:1235/does_not_matter',
    accessToken: true,
    complete: res.locals.setCacheByAPI,
    error: res.locals.apiError
  });
});

app.get('/cached_error', function(req, res, next){
  ajax({
    url: 'http://localhost:1235/cached_error',
    accessToken: true,
    complete: res.locals.setCacheByAPI,
    error: res.locals.apiError
  });
});



app.get('/concurrent', function(req, res, next){
  var render = _.after(2, function(){
    res.send('concurrent data');
  });
  ajax({
    url: 'http://localhost:1235/cached_data',
    accessToken: true,
    error: res.locals.apiError,
    complete: res.locals.setCacheByAPI,
    success: render
  });
  ajax({
    url: 'http://localhost:1235/more_cached_data',
    accessToken: true,
    error: res.locals.apiError,
    complete: res.locals.setCacheByAPI,
    success: render
  });
});



app.use(function(err, req, res, next) {
  var detail = err.message || err.text || err.toString();
  res.status(err.status || 500)
  res.send(detail + err.url + err.status);
  next();
});

module.exports = app;
