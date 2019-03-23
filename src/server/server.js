/*
  Evan MacHale - N00150552
  23.03.19
  server.js
*/

const { MongoClient } = require('mongodb');
// const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');

// loads environment variables from a .env file into process.env
require('dotenv').config();

const server = express();
// serve files from the dist directory
server.use(express.static('dist'));
// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// URL to our DB - loaded from an env variable
const dbRoute = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const dbName = process.env.DB;
let db;

// Connect to the db and start the express server
MongoClient.connect(dbRoute, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// retrieve all user objects from DB
server.get('/api/users', (req, res) => {
  console.log('hello wowee');
  db.collection('users').find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
