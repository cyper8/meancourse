var assert = require('assert');
var superagent = require('superagent');

module.exports = function(wagner){
  return wagner.invoke(function(Product,URL_ROOT){
    return describe('Product API', function(){
      it('can load a product by id', function(done) {
        Product.findOne({name: 'LG G4'},function(error,doc){
          assert.ifError(error);
          var id = doc._id;
          superagent.get(URL_ROOT+"/api/v1/product/"+id, function(error, res) {
            assert.ifError(error);
            var result;
            // And make sure we got the LG G4 back
            assert.doesNotThrow(function() {
              result = JSON.parse(res.text);
            });
            assert.ok(result.product);
            assert.equal(result.product._id, id);
            assert.equal(result.product.name, 'LG G4');
            done();
          });
        });
      });
      
      it('can load all products in a category with sub-categories', function(done){
        var url = URL_ROOT + '/api/v1/product/category/Electronics';
        // Make an HTTP request to localhost:3000/product/ancestor/Electronics
        superagent.get(url, function(error, res) {
          assert.ifError(error);
          var result;
          assert.doesNotThrow(function() {
            result = JSON.parse(res.text);
          });
          assert.equal(result.products.length, 2);
          // Should be in ascending order by name
          assert.equal(result.products[0].name, 'Asus Zenbook Prime');
          assert.equal(result.products[1].name, 'LG G4');

          // Sort by price, ascending
          var url = URL_ROOT + '/api/v1/product/category/Electronics?price=1';
          superagent.get(url, function(error, res) {
            assert.ifError(error);
            var result;
            assert.doesNotThrow(function() {
              result = JSON.parse(res.text);
            });
            assert.equal(result.products.length, 2);
            // Should be in ascending order by name
            assert.equal(result.products[0].name, 'LG G4');
            assert.equal(result.products[1].name, 'Asus Zenbook Prime');
            done();
          });
        });
      });
    });
  });
};
