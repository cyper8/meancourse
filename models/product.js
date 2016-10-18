var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema = {
  name: { type: String, required: true },
  // Pictures must start with "http://"
  pictures: [{ type: String, match: /^http:\/\//i }],
  price: {
    amount: {
      type: Number,
      required: true,
      set: function(v){
        this.internal.approximatePriceUSD = 
          v / fx()[this.price.currency];
        return v;
      }
    },
    // Only 3 supported currencies for now
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      required: true,
      set: function(v){
        this.internal.approximatePriceUSD = 
          this.price.amount / fx()[v];
        return v;
      }
    }
  },
  category: Category.categorySchema,
  internal: {
    approximatePriceUSD: Number
  }
};

var schema = new mongoose.Schema(productSchema);

schema.index({ name: 'text' });

var currencySymbols = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£'
};

/*
 * Human-readable string form of price - "$25" rather
 * than "25 USD"
 */
schema.virtual('displayPrice').get(function() {
  return (currencySymbols[this.price.currency])?
    (currencySymbols[this.price.currency] + '' + this.price.amount):
    (this.price.amount + ' ' + this.price.currency);
});

schema.virtual('chargePriceUSD').get(function(){
  return (this.price.amount / fx()[this.price.currency]).toFixed(2);
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.productSchema = productSchema;
