const mongoose = require('mongoose');

const foodImageSchema = new mongoose.Schema({
  url1: { type: String, required: true },
  url2: { type: String, required: true }
});

const foodPriceSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  currency: { type: String, required: true }
});

const foodSchema = new mongoose.Schema({
  business_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
  food_name: { type: String, required: true },
  meal_category: { type: String, required: true },
  category: { type: String, required: true },
  food_image: { type: foodImageSchema, required: true },
  food_price: { type: foodPriceSchema, required: true },
  food_availability: { type: Boolean, required: true },
  food_description: { type: String, required: true },
  preparation_time: { type: Number, required: true, min: 0, max: 9 }
});

module.exports = mongoose.model('Food', foodSchema);
