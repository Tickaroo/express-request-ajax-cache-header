module.exports = function(req, res) {
  return function(moduleError, isApiSuccess, apiResponse) {
    if (moduleError || res.getHeader('Cache-Control') || res.headersSent) {
      return;
    }
    if (apiResponse && apiResponse.headers && apiResponse.headers['cache-control']) {
      res.append('Cache-Control', apiResponse.headers['cache-control']);
    }
  };
};
