const BusinessOwner = require('../models/businessOwner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new business owner
const createBusinessOwner = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;
        const newBusinessOwner = new BusinessOwner({ first_name, last_name, email, phone, password });
        await newBusinessOwner.save();
        res.status(201).json({
            message: 'Business owner successfully created',
            data: newBusinessOwner
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all business owners
const getAllBusinessOwners = async (req, res) => {
    try {
        const businessOwners = await BusinessOwner.find();
        res.status(200).json(businessOwners);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a business owner by ID
const getBusinessOwnerById = async (req, res) => {
    try {
        const businessOwner = await BusinessOwner.findById(req.params.id);
        if (!businessOwner) {
            return res.status(404).json({ message: 'Business owner not found' });
        }
        res.status(200).json(businessOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a business owner
const updateBusinessOwner = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;
        const updatedBusinessOwner = await BusinessOwner.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, email, phone, password },
            { new: true, runValidators: true }
        );
        if (!updatedBusinessOwner) {
            return res.status(404).json({ message: 'Business owner not found' });
        }
        res.status(200).json(updatedBusinessOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a business owner
const deleteBusinessOwner = async (req, res) => {
    try {
        const deletedBusinessOwner = await BusinessOwner.findByIdAndDelete(req.params.id);
        if (!deletedBusinessOwner) {
            return res.status(404).json({ message: 'Business owner not found' });
        }
        res.status(200).json({ message: 'Business owner deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login a business owner
// const loginBusinessOwner = async (req, res) => {
//     try {
//         const { email, phone, password } = req.body;
//         const businessOwner = await BusinessOwner.findOne({ $or: [{ email }, { phone }] });
//         if (!businessOwner) {
//             return res.status(404).json({ message: 'Business owner not found' });
//         }
//         const isMatch = await bcrypt.compare(password, businessOwner.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign(
//             { id: businessOwner._id, email: businessOwner.email },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const loginBusinessOwner = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        const businessOwner = await BusinessOwner.findOne({ $or: [{ email }, { phone }] });
        if (!businessOwner) {
            return res.status(404).json({ message: 'Business owner not found' });
        }

        const isMatch = await bcrypt.compare(password, businessOwner.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: businessOwner._id, email: businessOwner.email },
            process.env.JWT_SECRET || 'secret125',
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: businessOwner._id, email: businessOwner.email },
            process.env.JWT_REFRESH_SECRET || 'secret2125',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: businessOwner,
            token,
            refreshToken
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'secret2125');

        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET || 'secret125',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: newToken,
            message: 'Token refreshed successfully'
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

module.exports = {
    createBusinessOwner,
    getAllBusinessOwners,
    getBusinessOwnerById,
    updateBusinessOwner,
    refreshToken,
    deleteBusinessOwner,
    loginBusinessOwner
};
