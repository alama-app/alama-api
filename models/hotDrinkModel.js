const mongoose = require('mongoose');

const hotDrinkSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  hotDrink_name: {
    type: String,
    required: true,
  },
  meal_category: {
    type: String,
  },
  category: {
    type: String,
  },
  hotDrink_image: {
    url1: { type: String },
    url2: { type: String },
  },
  hotDrink_price: {
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  hotDrink_availability: {
    type: Boolean,
    default: true,
  },
  hotDrink_description: {
    type: String,
  },
  preparation_time: {
    type: Number,
    min: 0,
    max: 9,
  },
});

module.exports = mongoose.model('HotDrink', hotDrinkSchema);
