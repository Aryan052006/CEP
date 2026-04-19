const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  available: { type: Boolean, default: true },
  image: { type: String, default: '' },
  bio: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Mentor', mentorSchema);
