const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
    category: { type: String, required: true },
    clientname: { type: String, required: true },
    projecturl: { type: String },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema, "clientspage");