const Food = require('../models/Food');
const cloudinary = require('../config/cloudinaryConfig');

const registerFood = async (req, res) => {
  try {
    console.log("Inside register");
    const { path: url1 } = await cloudinary.uploader.upload(req.files.url1[0].path, { folder: 'foods' });
    const { path: url2 } = await cloudinary.uploader.upload(req.files.url2[0].path, { folder: 'foods' });
 console.log("Adding Food")
    const newFood = new Food({
      ...req.body,
      food_image: { url1, url2 }
    });
console.log("Saving food!");
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByBusinessId = async (req, res) => {
  try {
    const foods = await Food.find({ business_id: req.params.business_id });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const updates = req.body;

    if (req.files && req.files.url1 && req.files.url1[0].path) {
      const { path: url1 } = await cloudinary.uploader.upload(req.files.url1[0].path);
      updates['food_image.url1'] = url1;
    }

    if (req.files && req.files.url2 && req.files.url2[0].path) {
      const { path: url2 } = await cloudinary.uploader.upload(req.files.url2[0].path);
      updates['food_image.url2'] = url2;
    }

    Object.assign(food, updates);
    await food.save();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    await food.remove();
    res.status(200).json({ message: 'Food item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerFood,
  getAllFoods,
  getById,
  getByBusinessId,
  updateFood,
  deleteFood
};
