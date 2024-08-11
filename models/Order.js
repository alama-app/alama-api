const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    category: { type: String, required: true }
});

const TotalPriceSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    currency: { type: String, default: 'TZS' }
});

const OrderSchema = new mongoose.Schema({
    business_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: false },
    customer_name: { type: String, required: true },
    table_number: { type: String, required: true },
    order_note: { type: String, required: false },
    order_items: { type: [OrderItemSchema], required: true },
    total_price: { type: TotalPriceSchema, required: true },
    order_status: { type: String, default: 'pending' },
    payment_status: { type: String, default: 'Not Paid' },
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
