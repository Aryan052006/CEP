const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full Time', 'Part Time', 'Contract', 'Freelance'], default: 'Full Time' },
  description: { type: String, default: '' },
  salary: { type: String, default: '' },
  state: { type: String, default: 'All' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
