const express = require("express");
const path = require("path");
const Client = require("../models/Client");
const upload = require("../middleware/upload");
const fs = require("fs");
const router = express.Router();

// ✅ Add Client API (with Image Upload)
router.post("/addClient", upload.single("image"), async (req, res) => {
    try {
        // Debugging: Log received data
        console.log("Received fields:", req.body);
        console.log("Received file:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image!" });
        }

        // Trim request body values to remove spaces
        const category = req.body.category?.trim();
        const clientname = req.body.clientname?.trim();
        const projecturl = req.body.projecturl?.trim(); // Fixing the extra space issue

        // Validate required fields
        if (!category || !clientname || !projecturl) {
            return res.status(400).json({ error: "Category, clientname, and projecturl are required!" });
        }

        // Create a new client document
        const client = new Client({
            category,
            clientname,
            projecturl,
            image: req.file.filename
        });

        // Save to database
        await client.save();
        console.log("Saved client:", client);
        res.status(201).json({ message: "Client added successfully!", client });
    } catch (error) {
        console.error("Error adding client:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ Update Client API
router.put("/updateClient/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { category, clientname, projecturl } = req.body;

        if (!category || !clientname || !projecturl) {
            return res.status(400).json({ error: "Category, clientname, and projecturl are required!" });
        }

        let updateData = { category, clientname, projecturl };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.json({ message: "Client updated successfully", client: updatedClient });
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ error: "Failed to update client" });
    }
});

module.exports = router;
