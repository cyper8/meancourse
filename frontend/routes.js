module.exports = {
  '/': {
    templateUrl: 'home.html',
    controller: function($scope){
        $scope.linkText = 'about';
    }
  },
  '/about': {
    templateUrl: 'about.html'
  }
};