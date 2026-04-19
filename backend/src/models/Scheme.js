const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Financial', 'Business', 'Skill', 'Employment', 'Education', 'Safety'] },
  benefits: { type: String, required: true },
  eligibility: { type: String, required: true },
  targetEmployment: { type: String, default: 'All' },
  minAge: { type: Number, default: 18 },
  maxAge: { type: Number, default: 65 },
  maxIncome: { type: Number, default: 9999999 },
  officialLink: { type: String, required: true },
  state: { type: String, default: 'All' },
});

module.exports = mongoose.model('Scheme', schemeSchema);
