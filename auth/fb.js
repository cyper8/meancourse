const Config = require("../config.json");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(User, app, passport){
  var authRedirect;
  passport.use(new FacebookStrategy(
    {
      clientID: Config.FB_ID,
      clientSecret: Config.FB_SECRET,
      callbackURL: 'https://mean-cyper8.c9users.io/auth/facebook/callback',
      profileFields: ['email']
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account:'+JSON.stringify(profile));
      }

      User.findOneAndUpdate(
        { 'data.oauth': profile.id },
        {
          $set: {
            'profile.username': profile.emails[0].value,
            'profile.picture': 'https://graph.facebook.com/' +
              profile.id.toString() + '/picture?type=large'
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });
    }
  ));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/auth/facebook',[ function(req,res,next){
      authRedirect = req.get("Referer");
      next();
    },
    passport.authenticate('facebook',{ scope: ['email'] })
  ]);
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: authRedirect, 
                                        failureRedirect: '/fail' }),
    function(req,res){
      res.redirect(authRedirect);
    }
  );
};
