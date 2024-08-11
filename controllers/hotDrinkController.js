const HotDrink = require('../models/hotDrinkModel');
const cloudinary = require('../config/cloudinaryConfig');


const registerHotDrink = async (req, res) => {
  try {
    const { business_id, hotDrink_name, meal_category, category, hotDrink_image, hotDrink_price, hotDrink_availability, hotDrink_description, preparation_time } = req.body;

    // Upload images to Cloudinary
    const uploadedImage1 = await cloudinary.uploader.upload(hotDrink_image.url1, { folder: 'hotDrinks' });
    const uploadedImage2 = await cloudinary.uploader.upload(hotDrink_image.url2, { folder: 'hotDrinks' });

    const newHotDrink = new HotDrink({
      business_id,
      hotDrink_name,
      meal_category,
      category,
      hotDrink_image: {
        url1: uploadedImage1.secure_url,
        url2: uploadedImage2.secure_url,
      },
      hotDrink_price,
      hotDrink_availability,
      hotDrink_description,
      preparation_time,
    });

    await newHotDrink.save();
    res.status(201).json(newHotDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllHotDrinks = async (req, res) => {
  try {
    const hotDrinks = await HotDrink.find();
    res.status(200).json(hotDrinks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotDrink = await HotDrink.findById(id);
    if (!hotDrink) return res.status(404).json({ message: 'Hot drink not found' });
    res.status(200).json(hotDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByBusinessId = async (req, res) => {
  try {
    const { business_id } = req.params;
    const hotDrinks = await HotDrink.find({ business_id });
    res.status(200).json(hotDrinks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHotDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if image URLs need to be updated
    if (updatedData.hotDrink_image) {
      if (updatedData.hotDrink_image.url1) {
        const uploadedImage1 = await cloudinary.uploader.upload(updatedData.hotDrink_image.url1, { folder: 'hotDrinks' });
        updatedData.hotDrink_image.url1 = uploadedImage1.secure_url;
      }
      if (updatedData.hotDrink_image.url2) {
        const uploadedImage2 = await cloudinary.uploader.upload(updatedData.hotDrink_image.url2, { folder: 'hotDrinks' });
        updatedData.hotDrink_image.url2 = uploadedImage2.secure_url;
      }
    }

    const hotDrink = await HotDrink.findByIdAndUpdate(id, updatedData, { new: true });
    if (!hotDrink) return res.status(404).json({ message: 'Hot drink not found' });
    res.status(200).json(hotDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHotDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const hotDrink = await HotDrink.findByIdAndDelete(id);
    if (!hotDrink) return res.status(404).json({ message: 'Hot drink not found' });
    res.status(200).json({ message: 'Hot drink deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerHotDrink,
  getAllHotDrinks,
  getById,
  getByBusinessId,
  updateHotDrink,
  deleteHotDrink,
};
