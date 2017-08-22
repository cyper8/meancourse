module.exports = function(app){
  
  // $user service
  app.factory('$user', function($http) {
    var s = {};
    s.loadUser = function() {
      $http
        .get('/api/v1/user/me')
        .success(function(data) {
          s.user = data.user;
        })
        .error(function(data, $status) {
          if ($status === 401) {
            s.user = null;
          }
        });
    };
    s.loadUser();
    setInterval(s.loadUser, 60 * 60 * 1000);
    return s;
  });
  
};