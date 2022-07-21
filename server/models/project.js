const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  website: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
