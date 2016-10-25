(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  
  // UserController
  app.controller('UserController', function($scope, $user){
    $scope.user = $user;
    setTimeout(function() {
      $scope.$emit('UserController');
    }, 0);
  });
  
  
};
},{}],2:[function(require,module,exports){
module.exports = function(app){
  
  // <user-menu></user-menu> element
  app.directive('userMenu', function(){
  	return {
  		conrollers: 'UserController',
  		restrict: 'E',
  		templateUrl: "users/user-menu.html"
  	};
  });

  
};
},{}],3:[function(require,module,exports){
var app = angular.module('myApp',['ng', 'ngRoute']);

// app.config(function($httpProvider){
//   $httpProvider.interceptors.push('$fbCleaner');
// });

require("./routes")(app);

require("./controllers")(app);

require("./elements")(app);

require("./services")(app);

},{"./controllers":1,"./elements":2,"./routes":4,"./services":5}],4:[function(require,module,exports){
module.exports = function(app){
  app.config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: function($scope){
          $scope.linkText = 'about';
      }
    })
    .when('/about',{
      templateUrl: 'about.html'
    })
    .otherwise('/');
  });
};
},{}],5:[function(require,module,exports){
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
},{}]},{},[3])