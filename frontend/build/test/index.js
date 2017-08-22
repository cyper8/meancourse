(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
describe('User Menu', require('./user-menu'));
},{"./user-menu":2}],2:[function(require,module,exports){
module.exports = function() {
  var injector;
  var element;
  var scope;
  var compiler;
  var httpBackend;
  
  beforeEach(function() {
    injector = angular.injector(['myApp', 'ngMockE2E']);
    intercepts = {};
  
    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();
      compiler = $compile;
      httpBackend = $httpBackend;
    });
  });
  
  it('shows logged in users name', function(done) {
    httpBackend.whenGET('users/user-menu.html').passThrough();
    httpBackend.expectGET('/api/v1/user/me').respond({
      user: { profile: { username: 'John' } }
    });
  
    element = compiler('<user-menu></user-menu>')(scope);
    scope.$apply();
  
    scope.$on('MyHttpController', function() {
      httpBackend.flush();
      assert.notEqual(element.find('.user').css('display'), 'none');
      assert.equal(element.find('.user').text().trim(), 'Current User: John');
      done();
    });
  });
};
},{}]},{},[1])