/* eslint prefer-destructuring: 0 */
/* eslint func-names: 0 */
/*
  Evan MacHale - N00150552
  23.03.19
  schema.js
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

// userSchema.pre('save', function (next) {
//   // Check if document is new or a new password has been set
//   if (this.isNew || this.isModified('password')) {
//     // Saving reference to this because of changing scopes
//     const document = this;
//     bcrypt.hash(document.password, 10,
//       (err, hashedPassword) => {
//         if (err) {
//           next(err);
//         } else {
//           document.password = hashedPassword;
//           next();
//         }
//       });
//   } else {
//     next();
//   }
// });

// userSchema.pre('save', (next) => {
//   if () {
//
//   } else {
//     next();
//   }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
