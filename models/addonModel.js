const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  addon_name: {
    type: String,
    required: true,
  },
  meal_category: {
    type: String,
  },
  category: {
    type: String,
  },
  addon_image: {
    url1: { type: String },
    url2: { type: String },
  },
  addon_price: {
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  addon_availability: {
    type: Boolean,
    default: true,
  },
  addon_description: {
    type: String,
  },
  preparation_time: {
    type: Number,
    min: 0,
    max: 9,
  },
});

module.exports = mongoose.model('Addon', addonSchema);
