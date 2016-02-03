var _ = require('lodash');
var expect = require('chai').expect;
var request = require('superagent');
var app = require('./fixture/app.js');
var api = require('./fixture/api.js');

describe('express-request-ajax-cache-header', function() {
  this.slow(200);

  var serverApp;
  var serverApi;

  before(function(done) {
    var after = _.after(2, done);
    serverApp = app.listen(1234, after);
    serverApi = api.listen(1235, after);
  });

  after(function() {
    serverApp.close();
    serverApi.close();
  });

  it('should set cacheControl for data', function(done) {
    return request.get('http://localhost:1234/cached_data').end(function(err, res){
      expect(res.headers['cache-control']).to.equal('public, max-age=31557600');
      done();
    });
  });

  it('should not set cacheControl for data', function(done) {
    return request.get('http://localhost:1234/data').end(function(err, res){
      expect(res.headers['cache-control']).to.equal(undefined);
      done();
    });
  });

  it('should set cacheControl for error', function(done) {
    return request.get('http://localhost:1234/cached_error').end(function(err, res){
      expect(res.headers['cache-control']).to.equal('public, max-age=21557600');
      done();
    });
  });

  it('should not set cacheControl for error', function(done) {
    return request.get('http://localhost:1234/error').end(function(err, res){
      expect(res.headers['cache-control']).to.equal(undefined);
      done();
    });
  });

  it('should set cacheControl only once', function(done) {
    return request.get('http://localhost:1234/concurrent').end(function(err, res){
      expect(res.headers['cache-control']).to.contain('public, max-age=');
      done();
    });
  });


  it('should set not set cacheControl for headersSent', function(done) {
    return request.get('http://localhost:1234/empty_download').end(function(err, res){
      expect(res.text).to.equal('empty_download');
      expect(res.headers['cache-control']).to.equal(undefined);
      done();
    });
  });

});
