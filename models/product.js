var mongoose = require('mongoose');
var Category = require('./category');


module.exports = function(wagner){
  return wagner.invoke(function(Fx){
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
              v / Fx()[this.price.currency];
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
              this.price.amount / Fx()[v];
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
      return (this.price.amount / Fx()[this.price.currency]).toFixed(2);
    });
    
    schema.set('toObject', { virtuals: true });
    schema.set('toJSON', { virtuals: true });
    
    schema.productSchema = productSchema;
    
    return schema;
  });
};