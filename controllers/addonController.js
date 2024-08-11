const Addon = require('../models/addonModel');
const cloudinary = require('../config/cloudinaryConfig');


const registerAddon = async (req, res) => {
  try {
    const { business_id, addon_name, meal_category, category, addon_image, addon_price, addon_availability, addon_description, preparation_time } = req.body;

    // Upload images to Cloudinary
    const uploadedImage1 = await cloudinary.uploader.upload(addon_image.url1, { folder: 'addons' });
    const uploadedImage2 = await cloudinary.uploader.upload(addon_image.url2, { folder: 'addons' });

    const newAddon = new Addon({
      business_id,
      addon_name,
      meal_category,
      category,
      addon_image: {
        url1: uploadedImage1.secure_url,
        url2: uploadedImage2.secure_url,
      },
      addon_price,
      addon_availability,
      addon_description,
      preparation_time,
    });

    await newAddon.save();
    res.status(201).json(newAddon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllAddons = async (req, res) => {
  try {
    const addons = await Addon.find();
    res.status(200).json(addons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const addon = await Addon.findById(id);
    if (!addon) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByBusinessId = async (req, res) => {
  try {
    const { business_id } = req.params;
    const addons = await Addon.find({ business_id });
    res.status(200).json(addons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAddon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if image URLs need to be updated
    if (updatedData.addon_image) {
      if (updatedData.addon_image.url1) {
        const uploadedImage1 = await cloudinary.uploader.upload(updatedData.addon_image.url1, { folder: 'addons' });
        updatedData.addon_image.url1 = uploadedImage1.secure_url;
      }
      if (updatedData.addon_image.url2) {
        const uploadedImage2 = await cloudinary.uploader.upload(updatedData.addon_image.url2, { folder: 'addons' });
        updatedData.addon_image.url2 = uploadedImage2.secure_url;
      }
    }

    const addon = await Addon.findByIdAndUpdate(id, updatedData, { new: true });
    if (!addon) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAddon = async (req, res) => {
  try {
    const { id } = req.params;
    const addon = await Addon.findByIdAndDelete(id);
    if (!addon) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json({ message: 'Addon deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerAddon,
  getAllAddons,
  getById,
  getByBusinessId,
  updateAddon,
  deleteAddon,
};
