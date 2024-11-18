const Table = require('../models/tableModel');
const QRCode = require('qrcode'); 
const cloudinary = require('../config/cloudinaryConfig');

const registerTable = async (req, res) => {
  try {
    const { tableNumber, status, capacity, business_id } = req.body;

    const existingTable = await Table.findOne({ tableNumber, business_id });
    if (existingTable) {
      return res.status(409).json({ message: 'Table number already exists.' });
    }

    const baseUrl = 'https://alama-client.vercel.app/admin/dashboard'; 
    const tableUrl = `${baseUrl}/${business_id}`;

    const qrCodeData = await QRCode.toDataURL(tableUrl);

    const uploadResult = await cloudinary.uploader.upload(qrCodeData, { folder: 'tables_qr_codes' });
    const qrCodeUrl = uploadResult.url;

    const newTable = new Table({
      tableNumber,
      status,
      capacity,
      business_id,
      qr_code: qrCodeUrl
    });

    await newTable.save();

    res.status(201).json({ message: 'Table registered successfully', table: newTable });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTable = async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTable) return res.status(404).json({ message: 'Table not found' });
    res.status(200).json({ message: 'Table updated successfully', table: updatedTable });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) return res.status(404).json({ message: 'Table not found' });
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTablesByBusinessId = async (req, res) => {
  try {
    const tables = await Table.find({ business_id: req.params.business_id });
    res.status(200).json(tables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerTable,
  getAllTables,
  updateTable,
  deleteTable,
  getTableById,
  getTablesByBusinessId
};
