module.exports = function (User, app) {
  var session = require("express-session");
  var passport = require('passport');

  var store = new (require("connect-mongodb-session")(session))({
    uri: 'mongodb://localhost:27017/app',
    collection: 'session'
  });
  
  app.use(require('express-session')({
    secret: (function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)})(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    store: store,
    resave: true,
    saveUninitialized: true
  }));

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.
      findOne({ _id : id }).
      exec(done);
  });



  // Facebook Auth
  require('./fb')(User, app, passport);
  // ...
  
  return app;
};