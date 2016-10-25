module.exports = function($q) {
  return {
    'response': function(response) {
      // alter the response
      var loc;
      if (loc = response.headers.location)
        response.headers.location = loc.replace(/_=_$/,'');

      // pass along the altered response
      return response;
    }
  };
};