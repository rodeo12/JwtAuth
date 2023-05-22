const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer'], default: 'buyer' },
});

module.exports = mongoose.model('User', userSchema);
