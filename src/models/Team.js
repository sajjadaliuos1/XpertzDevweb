const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String },
    fblink: { type: String },
   
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema, "teampage");