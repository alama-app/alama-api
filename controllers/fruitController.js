const Fruit = require('../models/fruitModel');
const cloudinary = require('../config/cloudinaryConfig');

const registerFruit = async (req, res) => {
  try {
    const { business_id, fruit_name, meal_category, category, fruit_image, fruit_price, fruit_availability, fruit_description, preparation_time } = req.body;

    // Upload images to Cloudinary
    const uploadedImage1 = await cloudinary.uploader.upload(fruit_image.url1, { folder: 'fruits' });
    const uploadedImage2 = await cloudinary.uploader.upload(fruit_image.url2, { folder: 'fruits' });

    const newFruit = new Fruit({
      business_id,
      fruit_name,
      meal_category,
      category,
      fruit_image: {
        url1: uploadedImage1.secure_url,
        url2: uploadedImage2.secure_url,
      },
      fruit_price,
      fruit_availability,
      fruit_description,
      preparation_time,
    });

    await newFruit.save();
    res.status(201).json(newFruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.status(200).json(fruits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const fruit = await Fruit.findById(id);
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByBusinessId = async (req, res) => {
  try {
    const { business_id } = req.params;
    const fruits = await Fruit.find({ business_id });
    res.status(200).json(fruits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if image URLs need to be updated
    if (updatedData.fruit_image) {
      if (updatedData.fruit_image.url1) {
        const uploadedImage1 = await cloudinary.uploader.upload(updatedData.fruit_image.url1, { folder: 'fruits' });
        updatedData.fruit_image.url1 = uploadedImage1.secure_url;
      }
      if (updatedData.fruit_image.url2) {
        const uploadedImage2 = await cloudinary.uploader.upload(updatedData.fruit_image.url2, { folder: 'fruits' });
        updatedData.fruit_image.url2 = uploadedImage2.secure_url;
      }
    }

    const fruit = await Fruit.findByIdAndUpdate(id, updatedData, { new: true });
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const fruit = await Fruit.findByIdAndDelete(id);
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json({ message: 'Fruit deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerFruit,
  getAllFruits,
  getById,
  getByBusinessId,
  updateFruit,
  deleteFruit,
};
