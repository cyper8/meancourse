const Config=require("../config.json");

var _ = require("underscore");

module.exports = function(wagner) {

  var libs = {

    // Stripe API
    Stripe: require("stripe")(Config.STRIPE),
    
    // Fixer.io API
    Fx: require("./fx")
  };
  
  _.each(libs, function(value,key){
    wagner.factory(key, function(){
      return value;
    });
  });

  return libs;
};
