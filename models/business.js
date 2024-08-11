const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    business_owner_id: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    business_category: {
        type: String,
        required: true
    },
    number_of_employees: {
        type: Number,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Business', BusinessSchema);
