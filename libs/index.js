var _ = require("underscore");

module.exports = function(wagner) {

  var libs = {

    // Stripe API
    Stripe: require("stripe")(process.env.STRIPE),
    
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
