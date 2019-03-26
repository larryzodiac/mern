/*
  Evan MacHale - N00150552
  26.03.19
  strategy.js
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./schema');

passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ');
  console.log(user); // the whole raw user object!
  console.log('---------');
  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called');
  User.findOne({ _id: id }, 'username', (err, result) => {
    console.log('*** Deserialize user, user:');
    console.log(result);
    console.log('--------------');
    done(null, result);
  });
});

passport.use(new LocalStrategy(
  ((username, password, done) => {
    User.findOne({ username }, (err, result) => {
      if (err) { return done(err); }
      if (!result) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!result.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, result);
    });
  }),
));

module.exports = passport;
