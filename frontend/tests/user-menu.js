module.exports = function() {
  var injector;
  var element;
  var scope;
  var intercepts;
  var httpBackend;
  
  beforeEach(function() {
    injector = angular.injector(['myApp', 'ngMockE2E']);
    intercepts = {};
  
    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();

      $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
      httpBackend = $httpBackend;

      element = $compile('<user-menu></user-menu>')(scope);
      scope.$apply();
    });
  });
  
  it('shows logged in users name', function(done) {
    httpBackend.expectGET('/api/v1/user/me').respond({
      user: { profile: { username: 'auser', picture: 'myPic' } }
    });

    scope.$on('UserController', function() {
      assert.equal(element.find('.title').text().trim(), 'Retail');

      httpBackend.flush();
      assert.notEqual(element.find('user-menu .current-user').css('display'), 'none');
      assert.equal(element.find('user-menu .current-user').attr('data-username'), 'auser')
      assert.equal(element.find('user-menu .current-user img.avatar').attr('src'), 'myPic');
      done();
    });
  });
};