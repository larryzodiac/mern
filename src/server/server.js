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
const jwt = require('jsonwebtoken');
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

server.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

server.get('/api/secret', (req, res) => {
  res.send('The password is potato');
});

server.post('/api/NEWsecret', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user.profile);
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

// server.post('/api/authenticate', (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email }, (err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500)
//         .json({
//           error: 'Internal error please try again',
//         });
//     } else if (!user) {
//       res.status(401)
//         .json({
//           error: 'Incorrect email or password',
//         });
//     } else {
//       user.isCorrectPassword(password, (err, same) => {
//         if (err) {
//           res.status(500)
//             .json({
//               error: 'Internal error please try again'
//             });
//         } else if (!same) {
//           res.status(401)
//             .json({
//               error: 'Incorrect email or password'
//             });
//         } else {
//           // Issue token
//           const payload = { email };
//           const token = jwt.sign(payload, process.env.SECRET, {
//             expiresIn: '1h'
//           });
//           res.cookie('token', token, { httpOnly: true }).sendStatus(200);
//         }
//       });
//     }
//   });
// });

// server.post('/api/signin', passport.authenticate('local', { failureRedirect: '/api/signin' }), (req, res) => {
//   console.log('COOOOOOL');
//   console.log('COOOOOOL');
//   console.log('COOOOOOL');
//   console.log('COOOOOOL');
//   const { email, password } = req.body;
//   console.log(email);

//   // const token = jwt.sign(email, process.env.SECRET);
//   const token = jwt.sign(email, process.env.SECRET, { expiresIn: '1h' });
//   // res.json({user, token});
//   res.cookie('token', token, { httpOnly: true }).sendStatus(200);
//   console.log('okay');
//   // res.redirect('/');
//   res.send('good');
// });

// server.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }, () => {
//   console.log('IN HERE');
// })(req, res));

server.post('/api/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    /*
      If this function gets called, authentication was successful.
      `req.user` contains the authenticated user.
    */
    console.log('server.post -------');
    console.log(user);
    console.log(info);
    console.log(err);
    if (err) { return next(err); }
    res.send('wow');
  })(req, res, next);
});
