const passport = require('passport');
const User = require('../models/User');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  console.log('Serializing user');
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.find(id)
  .then(user => done(null, user))
  .catch(err => done(err));
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Working...');
      const user = {
        'id': profile.id,
        'username': profile.displayName,
        'email': profile._json.email,
        'img_url': profile._json.picture
      }
      User.find(user.id).then(done(null, user))
      .catch(err => User.create(user));
    }
  )
);