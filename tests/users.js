var assert = require('assert');
var status = require('http-status');
var superagent = require('superagent');

module.exports = function(wagner){
  return wagner.invoke(function(User,URL_ROOT){
    return describe('User API', function(){
      var id;
      before(function(done){
        wagner.invoke(function(Product){
          Product.findOne({name: 'LG G4'}, function(err,prod){
            assert.ifError(err);
            id = prod._id.toString();
            done();
          });
        });
      });
      it('can save users cart', function(done) {
        var url = URL_ROOT + '/api/v1/user/me/cart';
        
        superagent.
          put(url).
          send({
            data: {
              cart: [{ product: id, quantity: 1 }]
            }
          }).
          end(function(error, res) {
            assert.ifError(error);
            assert.equal(res.status, status.OK);
            User.findOne({}, function(error, user) {
              assert.ifError(error);
              assert.equal(user.data.cart.length, 1);
              assert.equal(user.data.cart[0].product, id, ""+user.data.cart[0].product+" is not "+id);
              assert.equal(user.data.cart[0].quantity, 1);
              done();
            });
          });
      });
    
      it('can load users cart', function(done) {
        var url = URL_ROOT + '/api/v1/user/me';
    
        User.findOne({}, function(error, user) {
          assert.ifError(error);
          user.data.cart = [{ product: id, quantity: 1 }];
          user.save(function(error) {
            assert.ifError(error);
    
            superagent.get(url, function(error, res) {
              assert.ifError(error);
    
              assert.equal(res.status, 200);
              var result;
              assert.doesNotThrow(function() {
                result = JSON.parse(res.text).user;
              });
              assert.equal(result.data.cart.length, 1);
              assert.equal(result.data.cart[0].product.name, 'LG G4');
              assert.equal(result.data.cart[0].quantity, 1);
              done();
            });
          });
        });
      });
      
      it('can check out', function(done){
        var url = URL_ROOT+'/api/v1/user/checkout';
        
        User.findOne({}, function(error, user) {
          assert.ifError(error);
          user.data.cart = [{ product: id, quantity: 1 }];
          user.save(function(error) {
            assert.ifError(error);
    
            // Attempt to check out by posting to /api/v1/checkout
            superagent.
              post(url).
              send({
                // Fake stripe credentials. stripeToken can either be
                // real credit card credentials or an encrypted token -
                // in production it will be an encrypted token.
                stripeToken: {
                  number: '4242424242424242',
                  cvc: '123',
                  exp_month: '12',
                  exp_year: '2016'
                }
              }).
              end(wagner.invoke(function(Stripe){
                return function(error, res) {
                  assert.ifError(error);
      
                  assert.equal(res.status, 200);
                  var result;
                  assert.doesNotThrow(function() {
                    result = JSON.parse(res.text);
                  });
      
                  // API call gives us back a charge id.
                  assert.ok(result.id);
      
                  // Make sure stripe got the id
                  Stripe.charges.retrieve(result.id, function(error, charge) {
                    assert.ifError(error);
                    assert.ok(charge);
                    assert.equal(charge.amount, 300 * 100); // 300 USD
                    done();
                  });
                };
              }));
          });
        });
      });
    });
  });
};