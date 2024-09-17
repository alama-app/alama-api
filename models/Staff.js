// const mongoose = require('mongoose');

// const StaffSchema = new mongoose.Schema({
//     business_owner_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     business_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     staff_name: {
//         type: String,
//         required: true
//     },
//     staff_designation: {
//         type: String,
//         required: true
//     },
//     staff_code: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     staff_category: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('Staff', StaffSchema);



const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  business_owner_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  business_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  staff_name: { type: String, required: true },
  staff_designation: { type: String, required: true },
  staff_code: { type: String, required: true },
  staff_category: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  staff_image: { type: String }
});

module.exports = mongoose.model('Staff', staffSchema);
