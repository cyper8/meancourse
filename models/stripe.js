var Stripe = require('stripe');

module.exports = function(wagner) {
  var stripe = Stripe(process.env.STRIPE);

  wagner.factory('Stripe', function() {
    return stripe;
  });

  return {
    Stripe: stripe
  };
};
