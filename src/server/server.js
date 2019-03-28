/*
  Evan MacHale - N00150552
  23.03.19
  server.js
*/

// const { MongoClient } = require('mongodb');
// const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/User');
const passport = require('./passport');

// loads environment variables from a .env file into process.env
require('dotenv').config();

mongoose.Promise = global.Promise;
const server = express();

/*
  Connection
*/

// URL to our DB - loaded from an env variables
const dbURI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
// const dbName = process.env.DB;
// let dbConnection;

console.log(process.env.USER);
console.log(process.env.PASS);
console.log(process.env.HOST);

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
server.use(session({
  secret: 'da843qngq85q4n8qz',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

/*
  Routes
*/

server.get('/api/users', (req, res) => {
  console.log('hello get');
  User.find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// server.post('/api/users', (req, res) => {
//   console.log('hello sign up');
//   const { username, password, email } = req.body;
//   db.collection('users').findOne({ username }).toArray((err, result) => {
//     if (err || result) throw err;
//     const newUser = new User({
//       username,
//       email,
//       password,
//     });
//     newUser.save((er, savedUser) => {
//       if (er) throw er;
//       res.send(savedUser);
//     });
//   });
// });

server.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

server.get('/api/secret', (req, res) => {
  res.send('The password is potato');
});

// POST route to register a user
server.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  console.log(username);
  console.log(email);
  console.log(password);
  console.log(user);
  user.save((err) => {
    if (err) {
      console.log('');
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});
