const mongoose = require('mongoose');

const disease = new mongoose.Schema({
  diseaseName: { type: String, lowercase: true, trim: true, required: true },
});

module.exports = mongoose.model('disease', disease);
