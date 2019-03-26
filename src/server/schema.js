/* eslint prefer-destructuring: 0 */
/*
  Evan MacHale - N00150552
  23.03.19
  schema.js
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.methods.checkPassword = p => bcrypt.compareSync(p, this.password);
userSchema.methods.hash = p => bcrypt.hashSync(p, 10);

const User = mongoose.model('User', userSchema);

module.exports = User;
