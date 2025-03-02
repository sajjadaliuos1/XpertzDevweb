const express = require("express");
const Business = require("../models/Business");

const router = express.Router();

// Set up multer for file uploads
const multer = require('multer');

// Setup multer for form-data parsing
const upload = multer();

// Add Business API with multer middleware
router.post("/addBusiness", upload.none(), async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { category, details, SmSRate } = req.body;

        if (!category || !details || !SmSRate) {
            return res.status(400).json({ error: "Category, details, and SmSRate are required!" });
        }

        const business = new Business({
            category: category.trim(),
            details: details.trim(),
            SmSRate: SmSRate.trim(),
        });

        await business.save();
        res.status(201).json({ message: "Business added successfully!", business });
    } catch (error) {
        console.error("Error adding business:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update Business API with multer middleware
router.put("/updateBusiness/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;
        const { category, details, SmSRate } = req.body;

        console.log("Update request body:", req.body);

        if (!category || !details || !SmSRate) {
            return res.status(400).json({ error: "Category, details, and SmSRate are required!" });
        }

        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            { 
                category: category.trim(), 
                details: details.trim(), 
                SmSRate: SmSRate.trim() 
            },
            { new: true }
        );

        if (!updatedBusiness) {
            return res.status(404).json({ error: "Business record not found!" });
        }

        res.json({ message: "Business updated successfully!", business: updatedBusiness });
    } catch (error) {
        console.error("Error updating business:", error);
        res.status(500).json({ error: "Failed to update business" });
    }
});





module.exports = router;