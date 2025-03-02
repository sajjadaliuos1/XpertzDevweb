const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

// Explicitly set collection name to "servicespage"
module.exports = mongoose.model("Services", ServiceSchema, "servicespage");
