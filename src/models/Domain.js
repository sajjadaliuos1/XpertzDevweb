const mongoose = require("mongoose");

const DomainSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    features: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Domain", DomainSchema, "domainhosting");