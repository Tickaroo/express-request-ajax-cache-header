# express-request-ajax-cache-header
[![npm version](https://badge.fury.io/js/express-request-ajax-cache-header.svg)](https://www.npmjs.com/package/express-request-ajax-cache-header) [![Build Status](https://travis-ci.org/Tickaroo/express-request-ajax-cache-header.svg?branch=master)](https://travis-ci.org/Tickaroo/express-request-ajax-cache-header) [![codecov.io](https://codecov.io/github/Tickaroo/express-request-ajax-cache-header/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/express-request-ajax-cache-header?branch=master)


request-ajax handler to proxy API's cache-control header

## Install

```bash
$ npm install --save express-request-ajax-cache-header
```

## Usage

Below is a example of usage.

```javascript
var express = require('express');
var ajax = require('request-ajax');
var ajaxCacheHeader = require('express-request-ajax-cache-header');

var app = express();
app.use(function(req, res, next) {
  // bind error handler to `res.locals`
  res.locals.setCacheByAPI = ajaxCacheHeader(req, res);
});

app.get('/', function(req, res, next){
  ajax({
    url: 'http://my-api.com/test.json'
    // use as callback
    complete: res.locals.setCacheByAPI,
    success: function(){
      res.send('ok');
    }
  });
});
```
