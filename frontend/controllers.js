module.exports = function(app){
  
  // UserController
  app.controller('UserController', function($scope, $user){
    $scope.user = $user;
    setTimeout(function() {
      $scope.$emit('UserController');
    }, 0);
  });
  
  
};