const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Explicitly set collection name to "hompage"
module.exports = mongoose.model("Home", HomeSchema, "hompage");
