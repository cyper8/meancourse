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