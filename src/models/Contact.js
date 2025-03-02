const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema, "contactpage");
