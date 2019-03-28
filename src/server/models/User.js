/* eslint prefer-destructuring: 0 */
/* eslint func-names: 0 */
/*
  Evan MacHale - N00150552
  23.03.19
  User.js Model Object
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;
const Schema = mongoose.Schema;

/*
  Following code allows us to create User objects which have their own unique fields
  which can then be saved and retrieved from MongoDB to authenticate users.
*/

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// userSchema.methods.checkPassword = p => bcrypt.compareSync(p, this.password);
// userSchema.methods.hash = p => bcrypt.hashSync(p, 10);

/*
  '.pre' is mongoose middleware (document lifecycle hooks).
  '.pre' middleware functions are executed one after another, when each middleware calls next.
*/

userSchema.pre('save', function (next) {
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

/*
  Collections in a database are the Model name as lowercase and with appended 's' by default
  'const User' is 'users' in Atlas.
*/
const User = mongoose.model('User', userSchema);

module.exports = User;
