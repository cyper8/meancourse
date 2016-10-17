var assert = require('assert');
var superagent = require('superagent');

module.exports = function(wagner){
  return wagner.invoke(function(Category,URL_ROOT){
    return describe('Category API', function() {
      it('can load a category by id', function(done) {
        var url = URL_ROOT + '/api/v1/category/Electronics';
        // Make an HTTP request to localhost:3000/category/id/Electronics
        superagent.get(url, function(error, res) {
          assert.ifError(error);
          var result;
          // And make sure we got { _id: 'Electronics' } back
          assert.doesNotThrow(function() {
            result = JSON.parse(res.text);
          });
          assert.ok(result.category);
          assert.equal(result.category._id, 'Electronics');
          done();
        });
      });
    
      it('can load all categories that have a certain parent', function(done) {
        var url = URL_ROOT + '/api/v1/category/parent/Electronics';
        // Make an HTTP request to localhost:3000/category/parent/Electronics
        superagent.get(url, function(error, res) {
          assert.ifError(error);
          var result;
          assert.doesNotThrow(function() {
            result = JSON.parse(res.text);
          });
          assert.equal(result.categories.length, 2);
          // Should be in ascending order by _id
          assert.equal(result.categories[0]._id, 'Laptops');
          assert.equal(result.categories[1]._id, 'Phones');
          done();
        });
      });
    });
  });
};