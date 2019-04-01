/*
  Evan MacHale - N00150552
  23.03.19
  server.js
*/

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const passport = require('./passport');

// loads environment variables from a .env file into process.env
require('dotenv').config();

const server = express();

/*
  Connection
*/

// URL to our DB - loaded from an env variables
const dbURI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

mongoose.connect(dbURI, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  } else {
    server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
  }
});

/*
  Middleware
*/

// serve files from the dist directory
server.use(express.static('dist'));
// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

/*
  Routes
*/

server.get('/api/token', (req, res) => {
  if (req.cookies.token) {
    res.status(200).send('Token available');
  } else {
    res.status(401).send('No token found');
  }
});

server.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

server.get('/api/profile', (req, res, next) => {
  /*
    For some DAFT and frustrating reason, my headers don't have an
    authorization bearer token for passport.
  */
  req.headers.authorization = `Bearer ${req.cookies.token}`;
  passport.authenticate('jwt', (err, user) => {
    if (!user || err) res.status(401).send('Unauthorised');
    if (user) res.send(req.cookies.token);
  })(req, res, next);
});

// POST route to register a user
server.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  user.save((err) => {
    if (err) {
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

server.post('/api/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    /*
      If this function gets called, authentication was successful.
      `req.user` contains the authenticated user.
    */
    if (err || !user) {
      return res.status(400).json({
        message: info,
        user,
      });
    }
    req.login(user, { session: false }, (er) => {
      if (er) {
        res.send(er);
      }
      const token = jwt.sign(user.username, process.env.SECRET);
      return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
    /*
      Watch out in console for:
      Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      res.send()
    */
  })(req, res, next);
});

server.get('/api/logout', (req, res) => {
  req.logout();
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);
});
