var express = require('express');

module.exports = function(wagner){
  var apis = express();
  apis.use('/category', require('./categories')(wagner));
  apis.use('/product', require('./products')(wagner));
  apis.use('/user', require('./users')(wagner));
  return apis;
};