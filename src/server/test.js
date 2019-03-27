const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
}, { collection: 'userinfo' });

// Collections in database are Model name as lowercase and with appended 's'
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/db?retryWrites=true', { autoIndex: false });

const u1 = new User({ username: 'test', password: 'test2' });

u1.save((err, data) => {
  console.log('added');
});
