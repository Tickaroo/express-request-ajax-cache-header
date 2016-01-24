var express = require('express');

var app = express();

app.get('/data', function(req, res, next){
  res.json({foo: 'bar'});
});

app.get('/cached_data', function(req, res, next){
  res.setHeader('Cache-Control', 'public, max-age=' + 31557600);
  res.json({foo: 'bar'});
});

app.get('/more_cached_data', function(req, res, next){
  res.setHeader('Cache-Control', 'public, max-age=' + 431557600);
  res.json({morefoo: 'morebar'});
});

app.get('/error', function(req, res, next){
  res.status(500);
  res.json({error: true});
});

app.get('/cached_error', function(req, res, next){
  res.setHeader('Cache-Control', 'public, max-age=' + 21557600);
  res.status(500);
  res.json({error: true});
});


module.exports = app;
