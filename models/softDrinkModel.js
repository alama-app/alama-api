const mongoose = require('mongoose');

const softDrinkSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  softDrink_name: {
    type: String,
    required: true,
  },
  meal_category: {
    type: String,
  },
  category: {
    type: String,
  },
  softDrink_image: {
    url1: { type: String },
    url2: { type: String },
  },
  softDrink_price: {
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  softDrink_availability: {
    type: Boolean,
    default: true,
  },
  softDrink_description: {
    type: String,
  },
  preparation_time: {
    type: Number,
    min: 0,
    max: 9,
  },
});

module.exports = mongoose.model('SoftDrink', softDrinkSchema);
