const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  title: String,
  blurb: String,
  content: String,
  banner: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Article', ArticleSchema);
