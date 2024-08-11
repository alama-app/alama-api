const Staff = require('../models/Staff');

const registerStaff = async (req, res) => {
    try {
        const { business_owner_id, business_id, staff_name, staff_designation, staff_code, staff_category } = req.body;
        const newStaff = new Staff({ business_owner_id, business_id, staff_name, staff_designation, staff_code, staff_category });
        await newStaff.save();
        res.status(201).json({ message: 'Staff registered successfully', staff: newStaff });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const staffLogin = async (req, res) => {
    try {
        const { staff_code, staff_category } = req.body;
        const staff = await Staff.findOne({ staff_code, staff_category });
        if (!staff) return res.status(404).json({ message: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', staff });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStaffByBusinessId = async (req, res) => {
    try {
        const staffs = await Staff.find({ business_id: req.params.business_id });
        res.status(200).json(staffs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStaffByNameAndBusinessId = async (req, res) => {
    try {
        const { staff_name, business_id } = req.query;
        const staffs = await Staff.find({ staff_name, business_id });
        res.status(200).json(staffs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerStaff,
    staffLogin,
    getStaffByBusinessId,
    getStaffByNameAndBusinessId,
    getStaffById
};
