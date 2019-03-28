/*
  Evan MacHale - N00150552
  26.03.19
  strategy.js
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/User');
// loads environment variables from a .env file into process.env
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new LocalStrategy((email, password, done) => {
  console.log('hello local strat --------');
  console.log(email);
  console.log(password);
  console.log('');
  User.findOne({ email, password }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    const p = !user.verifyPassword(password);
    console.log('p:');
    console.log(p);
    if (!user.verifyPassword(password)) { return done(null, false); }
    return done(null, user);
  });
}));

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findOne({ id: jwtPayload.sub }, (err, user) => {
    if (err) {
      console.log('PASSPORT ERROR');
      return done(err, false);
    }
    if (user) {
      console.log('PASSPORT USER');
      return done(null, user);
    }
    console.log('PASSPORT ELSE');
    return done(null, false);
  });
}));

module.exports = passport;
