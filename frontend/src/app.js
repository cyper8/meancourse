var app = angular.module('myApp',['ng', 'ngRoute']);

// app.config(function($httpProvider){
//   $httpProvider.interceptors.push('$fbCleaner');
// });

require("./routes")(app);

require("./controllers")(app);

require("./elements")(app);

require("./services")(app);
