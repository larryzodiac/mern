/*
  Evan MacHale - N00150552
  23.03.19
  User.js Model Object
*/

/*
  Schema maps to a MongoDB collection + defines the shape of documents within that collection
  user_id -> 12M foreign key 
*/

/* eslint prefer-destructuring: 0 */
/* eslint no-useless-escape: 0 */
/* eslint func-names: 0 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;
const Schema = mongoose.Schema;

/*
  Following code allows us to create User objects which have their own unique fields
  which can then be saved and retrieved from MongoDB to authenticate users.
*/

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Use Andrew's methods
// UserSchema.methods.checkPassword = p => bcrypt.compareSync(p, this.password);
// UserSchema.methods.hash = p => bcrypt.hashSync(p, 10);

// Don't refractor, changes scope of 'this'
UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

/*
  '.pre' is mongoose middleware (document lifecycle hooks).
  '.pre' middleware functions are executed one after another, when each middleware calls next.
*/

UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('email')) {
    const document = this;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(document.email)) {
      next();
    } else {
      const err = new Error('custom error : email not valid');
      next(err);
    }
  } else {
    next();
  }
});

/*
  Collections in a database are the Model name as lowercase and with appended 's' by default
  'const User' is 'users' in Atlas.
*/

const User = mongoose.model('User', UserSchema);

module.exports = User;
