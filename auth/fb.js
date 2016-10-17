var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(User){
  return {
    name: 'facebook',
    strategy: new FacebookStrategy(
      {
        clientID: process.env.ID,
        clientSecret: process.env.SEC,
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
              'profile.picture': 'http://graph.facebook.com/' +
                profile.id.toString() + '/picture?type=large'
            }
          },
          { 'new': true, upsert: true, runValidators: true },
          function(error, user) {
            done(error, user);
          });
      }
    ),
    routes: {
      init: {
        type: 'get',
        path: 'facebook',
        options: {
          scope: ['email']
        },
        callback: function(){} //never used 'cause of redirect
      },
      callback: {
        type: 'get',
        path: 'facebook/callback',
        options: { failureRedirect: '/fail' },
        callback: function(req, res) {
          res.send('Welcome, ' + req.user.profile.username);
        }
      }
    }
  };
};
