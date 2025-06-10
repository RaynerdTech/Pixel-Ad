const mongoose = require('mongoose');

const PixelSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 200,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 1000,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  reference: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Pixel', PixelSchema);
