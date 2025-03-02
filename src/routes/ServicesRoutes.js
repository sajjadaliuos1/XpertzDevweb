const express = require("express");
const path = require("path"); // Required for image path handling
const ServicesModel = require("../models/Services"); // Renamed to avoid conflict
const upload = require("../middleware/upload");
const fs = require("fs");

const router = express.Router();

router.post("/addServices", upload.single("image"), async (req, res) => {
    try {
        console.log("Received File:", req.file); // Debugging

        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image!" });
        }

        const { category, title, description } = req.body;

        if (!category || !title || !description) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Create new service entry using correct model name
        const newService = new ServicesModel({
            category,
            title,
            description,
            image: req.file.filename, 
        });

        await newService.save();
        res.status(201).json({ message: "Content added successfully!" });

    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
///////Update About Page Api/////
router.put("/updateServices/:id", upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, category } = req.body;
      let updateData = { title, description, category };
  
      if (req.file) {
        updateData.image = `/assets/${req.file.filename}`; // Corrected image path
      }
  
      const updatedService = await ServicesModel.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      res.json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Failed to update service" });
    }
  });
  
module.exports = router;
