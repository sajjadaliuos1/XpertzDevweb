const express = require("express");
const path = require("path"); // Required for image path handling
const About = require('../models/About'); // Ensure correct import
const upload = require("../middleware/upload");
const fs = require("fs"); 
const router = express.Router();

router.post("/addAbout", upload.single("image"), async (req, res) => {
    try {
      console.log("Received File:", req.file); // Debugging
  
      if (!req.file) {
        return res.status(400).json({ error: "Please upload an image!" });
      }
  
      const { category, title, paragraph,  } = req.body;
      if (!category || !title || !paragraph ) {
        return res.status(400).json({ error: "All fields are required!" });
      }
  
      const about = new About({
        category,
        title,
        paragraph,
        image: `${req.file.filename}`, 
      });
  
      await about.save();
      res.status(201).json({ message: "Content added successfully!" });
    } catch (error) {
      console.error("Error adding content:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  ///////Update About Page Api/////
  router.put("/updateAbout/:id",  upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, paragraph, category } = req.body;
      let updateData = { title, paragraph, category };
  
      if (req.file) {
        updateData.image = `../../public/assets/${req.file.filename}`;
      }
  
      const updatedHome = await About.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedHome) {
        return res.status(404).json({ error: "About not found" });
      }
  
      res.json({ message: "About updated successfully", home: updatedHome });
    } catch (error) {
      res.status(500).json({ error: "Failed to update home" });
    }
  });
  module.exports = router;