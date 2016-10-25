var controllers = require("./controllers");
var elements = require("./elements");
var services = require("./services");
var routes = require("./routes");
var _ = require("underscore");

var app = angular.module('myApp',['ng', 'ngRoute']);

// app.config(function($httpProvider){
//   $httpProvider.interceptors.push('$fbCleaner');
// });

_.each(routes, function(router, route){
  app.config(function($routeProvider){
    $routeProvider
    .when(route,router);
  });
});

app.config(function($routeProvider){
  $routeProvider
  .otherwise("/");
});

_.each(controllers, function(controller, name){
  app.controller(name, controller);
});

_.each(elements, function(element, name){
  app.directive(name, element);
});

_.each(services, function(service, name){
  app.factory(name, service);
});