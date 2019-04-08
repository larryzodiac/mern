/*
  Evan MacHale - N00150552
  23.03.19
  Article.js
*/

/*
  Schema maps to a MongoDB collection + defines the shape of documents within that collection
  user_id -> 12M foreign key
*/

const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  title: String,
  blurb: String,
  content: String,
  banner: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Article', ArticleSchema);
