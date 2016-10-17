var categories = [
  { _id: 'Electronics' },
  { _id: 'Phones', parent: 'Electronics' },
  { _id: 'Laptops', parent: 'Electronics' },
  { _id: 'Bacon' }
];

var products = [
  {
    name: 'LG G4',
    category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
    price: {
      amount: 300,
      currency: 'USD'
    }
  },
  {
    name: 'Asus Zenbook Prime',
    category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
    price: {
      amount: 2000,
      currency: 'USD'
    }
  },
  {
    name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
    category: { _id: 'Bacon', ancestors: ['Bacon'] },
    price: {
      amount: 20,
      currency: 'USD'
    }
  }
];

var users = [{
  profile: {
    username: 'sampleuser',
    picture: 'https://lh5.googleusercontent.com/-C95gOfbGVxY/AAAAAAAAAAI/AAAAAAAAAPI/LUvKR4fWyKg/s48-c/photo.jpg'
  },
  data: {
    oauth: 'invalid',
    cart: []
  }
}];

module.exports = function(wagner){
  wagner.invoke(function(Category){
    Category.create(categories, function(error, categories){
      if (error){
        console.error(error);
        process.exit(1);
      }
      wagner.invoke(function(Product){
        Product.create(products,function(error, products){
          if (error){
            console.error(error);
            process.exit(1);
          }
          wagner.invoke(function(User){
            User.create(users, function(error, users){
              if (error){
                console.error(error);
                process.exit(1);
              }
            });
          });
        });
      });
    });
  });
};