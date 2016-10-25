module.exports = function($scope, $location, $http){
	//console.log($scope.authredirect = encodeURIComponent($location.absUrl()));
	if (!$scope.user)
		$http.get('/api/v1/user/me').success(function(data){
			$scope.user = data.user;
		});
};