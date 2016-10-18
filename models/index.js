var mongoose = require('mongoose');
var _ = require("underscore");

module.exports = function(wagner,db_url) {
  mongoose.connect(db_url);

  var models = {

    // Category model
    Category : mongoose.model('Category', require('./category'), 'categories'),
  
    // Product model
    Product : mongoose.model('Product', require('./product')(wagner), 'products'),
    
    // User model
    User : mongoose.model('User', require('./user'), 'users'),
  };
  
  _.each(models, function(value,key){
    wagner.factory(key, function(){
      return value;
    });
  });

  return models;
};
