/*
  Evan MacHale - N00150552
  23.03.19
  server.js
*/

/* eslint no-useless-escape: 0 */

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Article = require('./models/Article');
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
server.use(express.static(path.join(__dirname, '/public')));
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
  Article.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

server.get('/api/article/:id', (req, res) => {
  Article.findOne({ _id: req.params.id }, (err, data) => {
    /*
      Error handling if the id param is wrong
      Error -> MIME type ('text/html') is not supported
      Need to ask Andrew...
    */
    if (err) res.status(404).send('Article not found');
    res.send(data);
  });
});

server.get('/api/profile', (req, res, next) => {
  /*
    For some DAFT and frustrating reason, my headers don't have an
    authorization bearer token for passport.
  */
  req.headers.authorization = `Bearer ${req.cookies.token}`;
  passport.authenticate('jwt', (err, user) => {
    if (!user || err) res.status(401).send('Unauthorised');
    if (user) res.send(user);
  })(req, res, next);
});

server.post('/api/signup', (req, res) => {
  const {
    username,
    email,
    password,
    confirm,
  } = req.body;
  if (username === '' || email === '' || password === '' || confirm === '') {
    res.status(500).send('Missing credentials');
  }
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    res.status(500).send('Invalid email');
  }
  if (password !== confirm || password === '' || confirm === '') {
    res.status(500).send('Passwords do not match');
  }
  const user = new User({ username, email, password });
  /*
    Watch out in console for:
    Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    res.send()
  */
  user.save((err) => {
    if (err) {
      res.status(500).send('Error registering new user please try again.');
    }
    res.status(200).send('Successful sign up');
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
