const test_IP = '127.0.0.1';
const test_PORT = 3000;

var express = require('express');
var wagner = require('wagner-core');

var app,server;

require("../libs")(wagner);
require('../models')(wagner,'mongodb://localhost:27017/test');
app = express();

// temporary patch instead of login api
app.use(wagner.invoke(function(User) {
  return function(req, res, next) {
    User.findOne({}, function(error, user) { req.user = user; next(); });
  };
}));

app.use('/api/v1', require('../apis')(wagner));
server = app.listen(test_PORT,test_IP);
wagner.factory('URL_ROOT', function(){
  return 'http://'+test_IP+":"+test_PORT;
});

describe('app', function(){
  before(function(){
    require('./db_init')(wagner);
  });
  after(function(done){
    // cleanup
    wagner.invoke(function(Product){
      Product.remove({}, function(error){
        if (error){
          console.error(error);
        }
        wagner.invoke(function(Category){
          Category.remove({}, function(error){
            if (error){
              console.error(error);
            }
            wagner.invoke(function(User){
              User.remove({}, function(err){
                if (err){
                  console.error(err);
                }
                done();
              });
            });
          });
        });
      });
    });
    server.close();
  });
  
  require('./categories')(wagner);
  require("./products")(wagner);
  require("./users")(wagner);
});




