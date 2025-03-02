const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Explicitly set collection name to "hompage"
module.exports = mongoose.model("About", AboutSchema, "aboutpage");
