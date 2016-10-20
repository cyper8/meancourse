var users = angular.module('users',['../app.js']);

users.directive('userMenu', function(){
	conrollers: 'UsersController',
	template: "user-menu.html"
});

users.controller('UsersController', function($scope, $http){
	$http.get('/api/v1/user/me').success(function(data){
		$scope.user = data.user;
	});
});