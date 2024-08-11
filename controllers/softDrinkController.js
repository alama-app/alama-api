const SoftDrink = require('../models/softDrinkModel');
const cloudinary = require('../config/cloudinaryConfig');


const registerSoftDrink = async (req, res) => {
  try {
    const { business_id, softDrink_name, meal_category, category, softDrink_image, softDrink_price, softDrink_availability, softDrink_description, preparation_time } = req.body;

    // Upload images to Cloudinary
    const uploadedImage1 = await cloudinary.uploader.upload(softDrink_image.url1, { folder: 'softDrinks' });
    const uploadedImage2 = await cloudinary.uploader.upload(softDrink_image.url2, { folder: 'softDrinks' });

    const newSoftDrink = new SoftDrink({
      business_id,
      softDrink_name,
      meal_category,
      category,
      softDrink_image: {
        url1: uploadedImage1.secure_url,
        url2: uploadedImage2.secure_url,
      },
      softDrink_price,
      softDrink_availability,
      softDrink_description,
      preparation_time,
    });

    await newSoftDrink.save();
    res.status(201).json(newSoftDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSoftDrinks = async (req, res) => {
  try {
    const softDrinks = await SoftDrink.find();
    res.status(200).json(softDrinks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const softDrink = await SoftDrink.findById(id);
    if (!softDrink) return res.status(404).json({ message: 'Soft drink not found' });
    res.status(200).json(softDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByBusinessId = async (req, res) => {
  try {
    const { business_id } = req.params;
    const softDrinks = await SoftDrink.find({ business_id });
    res.status(200).json(softDrinks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSoftDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if image URLs need to be updated
    if (updatedData.softDrink_image) {
      if (updatedData.softDrink_image.url1) {
        const uploadedImage1 = await cloudinary.uploader.upload(updatedData.softDrink_image.url1, { folder: 'softDrinks' });
        updatedData.softDrink_image.url1 = uploadedImage1.secure_url;
      }
      if (updatedData.softDrink_image.url2) {
        const uploadedImage2 = await cloudinary.uploader.upload(updatedData.softDrink_image.url2, { folder: 'softDrinks' });
        updatedData.softDrink_image.url2 = uploadedImage2.secure_url;
      }
    }

    const softDrink = await SoftDrink.findByIdAndUpdate(id, updatedData, { new: true });
    if (!softDrink) return res.status(404).json({ message: 'Soft drink not found' });
    res.status(200).json(softDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSoftDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const softDrink = await SoftDrink.findByIdAndDelete(id);
    if (!softDrink) return res.status(404).json({ message: 'Soft drink not found' });
    res.status(200).json({ message: 'Soft drink deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerSoftDrink,
  getAllSoftDrinks,
  getById,
  getByBusinessId,
  updateSoftDrink,
  deleteSoftDrink,
};
