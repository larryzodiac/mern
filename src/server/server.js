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
const User = require('./schema');
const passport = require('./passport');

// loads environment variables from a .env file into process.env
require('dotenv').config();

mongoose.Promise = global.Promise;
const server = express();

/*
  Connection
*/

// URL to our DB - loaded from an env variables
const dbRoute = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
// const dbName = process.env.DB;
let dbConnection;

mongoose.connect(dbRoute, { useNewUrlParser: true }).then(
  // client => client.db(dbName),
  () => server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`)),
  err => console.log(err),
);

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
