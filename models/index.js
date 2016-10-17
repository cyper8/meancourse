var mongoose = require('mongoose');
var _ = require("underscore");

module.exports = function(wagner,db_url) {
  mongoose.connect(db_url);

  var models = {

    // Category model
    Category : mongoose.model('Category', require('./category'), 'categories'),
  
    // Product model
    Product : mongoose.model('Product', require('./product'), 'products'),
    
    // User model
    User : mongoose.model('User', require('./user'), 'users'),
    
    // Stripe object - dont ask me why it is here
    Stripe: require("stripe")(process.env.STRIPE)
  };
  
  _.each(models, function(value,key){
    wagner.factory(key, function(){
      return value;
    });
  });

  return models;
};
