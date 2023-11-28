const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }], // Assuming you reference images
});

module.exports = mongoose.model('UploadSchema', uploadSchema);
