const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Available', 'Occupied', 'Reserved'] },
  capacity: { type: Number, required: true },
  qr_code: { type: String, required: false },
  business_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' }
});

module.exports = mongoose.model('Table', tableSchema);
