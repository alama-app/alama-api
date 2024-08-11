const Order = require('../models/Order');
const mongoose = require('mongoose');

// Helper function to get item details by category and category_id
// const getItemDetails = async (category, category_id) => {
//     const model = require(`../models/${category}`);
//     return await model.findById(category_id);
// };

const placeOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllByBusinessId = async (req, res) => {
    try {
        const orders = await Order.find({ business_id: req.params.business_id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getByBusinessIdForToday = async (req, res) => {
    try {
        const { business_id } = req.params;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const orders = await Order.find({
            business_id: business_id,
            time: { $gte: today }
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getByBusinessIdAndStaffId = async (req, res) => {
    try {
        const { business_id, staff_id } = req.params;
        const orders = await Order.find({ business_id: business_id, staff_id: staff_id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    placeOrder,
    getAllByBusinessId,
    getByBusinessIdForToday,
    getByBusinessIdAndStaffId
};
