app
.directive('userMenu', function(){
	return {
		conrollers: 'UsersController',
		restrict: 'E',
		templateUrl: "users/user-menu.html"
	}
})
.controller('UsersController', ['$scope', '$http',function($scope, $http){
	if (!$scope.user)
		$http.get('/api/v1/user/me').success(function(data){
			$scope.user = data.user;
		});
}]);