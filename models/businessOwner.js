const mongoose = require('mongoose');

const businessOwnerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

const BusinessOwner = mongoose.model('BusinessOwner', businessOwnerSchema);

module.exports = BusinessOwner;
