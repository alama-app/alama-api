const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  fruit_name: {
    type: String,
    required: true,
  },
  meal_category: {
    type: String,
  },
  category: {
    type: String,
  },
  fruit_image: {
    url1: { type: String },
    url2: { type: String },
  },
  fruit_price: {
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  fruit_availability: {
    type: Boolean,
    default: true,
  },
  fruit_description: {
    type: String,
  },
  preparation_time: {
    type: Number,
    min: 0,
    max: 9,
  },
});

module.exports = mongoose.model('Fruit', fruitSchema);
