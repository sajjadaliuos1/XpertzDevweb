const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    category: { type: String, required: true },
    details: { type: String, required: true },
    SmSRate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Business', BusinessSchema,"businesspage");
