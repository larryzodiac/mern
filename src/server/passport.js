/*
  Evan MacHale - N00150552
  26.03.19
  strategy.js
*/

/* eslint consistent-return: 0 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/User');
// loads environment variables from a .env file into process.env
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorrect username' }); }
    user.isCorrectPassword(password, (er, same) => {
      if (!same || er) return done(null, false, { message: 'Incorrect password' });
      return done(null, user);
    });
  });
}));

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  console.log(`jwtpayload = ${jwtPayload}`);
  User.findOne({ username: jwtPayload }, (err, user) => {
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
