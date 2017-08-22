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