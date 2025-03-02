const express = require("express");
const path = require("path");
const Portfolio = require("../models/Portfolio");
const upload = require("../middleware/upload");
const fs = require("fs");
const router = express.Router();

// Add Portfolio API
router.post("/addPortfolio", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image!" });
        }
        
        console.log("Received Request Body:", req.body);

        const { category, title, githuburl, livedemo, description } = req.body;

        if (!category || !title || !description) {
            return res.status(400).json({ error: "Category, Title, and Description are required!" });
        }

        const portfolio = new Portfolio({
            category,
            title,
            githuburl: githuburl || "", 
            livedemo: livedemo || "", 
            description,
            image: req.file.filename
        });

        await portfolio.save();
        console.log("Saved Portfolio:", portfolio);
        res.status(201).json({ message: "Content added successfully!", portfolio });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update Portfolio API
router.put("/updatePortfolio/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, githuburl, livedemo } = req.body;
        let updateData = { title, description, category, githuburl, livedemo };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPortfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        res.json({ message: "Portfolio updated successfully", portfolio: updatedPortfolio });
    } catch (error) {
        console.error("Error updating portfolio:", error);
        res.status(500).json({ error: "Failed to update portfolio" });
    }
});

module.exports = router;