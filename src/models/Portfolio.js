const mongoose = require("mongoose");
const PortfolioSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    githuburl: { type: String },
    livedemo: { type: String },
    description: { type: String },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", PortfolioSchema, "protfoliopage");