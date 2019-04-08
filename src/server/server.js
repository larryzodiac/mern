/*
  Evan MacHale - N00150552
  23.03.19
  server.js
*/

/* eslint no-useless-escape: 0 */

const { ObjectID } = require('mongodb');
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
server.use(express.static(path.join(__dirname, '/public'))); // Needed?
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
  Authentication Routes
*/

/*
  Request made in App.js
  Using JWT Check to see if the user has logged in recently
*/
server.get('/api/token', (req, res, next) => {
  if (req.cookies.token) {
    req.headers.authorization = `Bearer ${req.cookies.token}`;
    passport.authenticate('jwt', (err, user) => {
      if (user) res.send(user._id);
    })(req, res, next);
  } else {
    res.status(401).send('No token found');
  }
});

/*
  Request made in Profile.js
  If the user is logged in  show their articles, else redirect
*/
server.get('/api/profile', (req, res, next) => {
  /*
    For some DAFT and frustrating reason, my headers don't have an
    authorization bearer token for passport.
  */
  req.headers.authorization = `Bearer ${req.cookies.token}`;
  passport.authenticate('jwt', (err, user) => {
    if (!user || err) res.status(401).send('Unauthorised');
    if (user) {
      Article.find({ user_id: user._id }, (er, articles) => {
        if (err) res.send(user);
        res.send({ user, articles });
      });
    }
  })(req, res, next);
});

/*
  Request made in Signup.js
  Validates the req.body + saves a new User
*/
server.post('/api/signup', (req, res) => {
  const {
    username,
    email,
    password,
    confirm,
  } = req.body;
  if (username === '' || email === '' || password === '' || confirm === '') {
    res.status(500).send('Missing credentials');
    return;
  }
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    res.status(500).send('Invalid email');
    return;
  }
  if (password !== confirm || password === '' || confirm === '') {
    res.status(500).send('Passwords do not match');
    return;
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
      return;
    }
    res.status(200).send('Successful sign up');
  });
});

/*
  Request made in Signin.js
  Using local strategy from Passport.js w/ custom callback
  If strategy successful, initialise a new JWT
*/
server.post('/api/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    /*
      If this function gets called, authentication was successful.
      `req.user` contains the authenticated user.
    */
    if (err || !user) {
      res.status(400).json({
        message: info,
        user,
      });
      return;
    }
    req.login(user, { session: false }, (er) => {
      if (er) {
        res.send(er);
        return;
      }
      const token = jwt.sign(user.username, process.env.SECRET);
      res.cookie('token', token, { httpOnly: true });
      res.send(user._id);
    });
    /*
      Watch out in console for:
      Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      res.send()
    */
  })(req, res, next);
});

/*
  Request made in AppBar.js
  Removes the JWT cookie
*/
server.get('/api/logout', (req, res) => {
  req.logout();
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);
});

/*
  Routes
*/

/*
  Request made in Home.js
  Returns all articles on the site
*/
server.get('/api/home', (req, res) => {
  Article.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/*
  Request made in ArticlePage.js + Publish.js
  ArticlePage is for reading
  Publish populates a form for updating
  Returns a specific article that matches the url parametre
*/
server.get('/api/article/:id', (req, res) => {
  Article.findOne({ _id: req.params.id }, (err, data) => {
    /*
      Error handling if the id param is wrong
      Error -> MIME type ('text/html') is not supported
      Need to ask Andrew...
    */
    if (err) console.log('err in get article');
    if (data) {
      res.send(data);
    } else {
      res.status(404).send('Article not found');
    }
  });
});

/*
  Request made in Provider.js
  An axios delete request method is defined in context
  It is in Provider as there are multiple pages where a user can see their articles, and their delete options
*/
server.delete('/api/article/:id', (req, res) => {
  Article.deleteOne({ _id: new ObjectID(req.params.id) }, (err) => {
    if (err) throw err;
    res.status(200).send('Successfully deleted');
  });
});

/*
  Both of the following routes are called in Publish.js
  The route chosen is defined in React based on a case
  '/api/user/:id/article' is used to update an existing article
  '/api/article/:id' is used to create a new article
*/
server.post('/api/user/:id/article', (req, res) => {
  const { title, blurb, content } = req.body;
  if (title === '' || title === 'Title' || blurb === '' || blurb === 'Give the reader a summary..' || content === '' || content === 'Tell your story..') {
    res.status(500).send("You've left something out.");
    return;
  }
  const article = new Article({
    title,
    blurb,
    content,
    user_id: req.params.id,
  });
  article.save((err) => {
    if (err) {
      res.status(500).send('Error publishing story');
      return;
    }
    res.status(200).send('Successfully published');
  });
});

server.post('/api/article/:id', (req, res) => {
  Article.updateOne({ _id: new ObjectID(req.params.id) }, { $set: req.body }, (err) => {
    if (err) throw err;
    res.status(200).send('Successfully published');
  });
});
