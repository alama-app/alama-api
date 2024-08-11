const Business = require('../models/business');

const createBusiness = async (req, res) => {
    try {
        const { business_owner_id, business_name, business_category, number_of_employees, logo, license, location } = req.body;
        const newBusiness = new Business({ business_owner_id, business_name, business_category, number_of_employees, logo, license, location });
        await newBusiness.save();
        res.status(201).json({ message: 'Business created successfully', business: newBusiness });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBusiness = async (req, res) => {
    try {
        const { business_owner_id, business_name, business_category, number_of_employees, logo, license, location } = req.body;
        const business = await Business.findByIdAndUpdate(req.params.id, { business_owner_id, business_name, business_category, number_of_employees, logo, license, location }, { new: true });
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.status(200).json({ message: 'Business updated successfully', business });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBusiness,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness
};
