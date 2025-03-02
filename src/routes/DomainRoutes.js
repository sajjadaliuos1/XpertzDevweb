const express = require("express");
const Domain = require("../models/Domain"); // Ensure correct import
const router = express.Router();

const multer = require('multer');

// Setup multer for form-data parsing
const upload = multer();
// Add Domain API
router.post("/addDomain", upload.none(), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    let { category, title, features } = req.body;
    
    console.log("Before parsing:", { category, title, features });
    // Rest of your code...

      // Parse features if it's a stringified JSON array
            if (typeof features === "string") {
        try {
          features = JSON.parse(features);
          if (!Array.isArray(features)) {
            throw new Error("Features is not an array");
          }
        } catch (error) {
          return res.status(400).json({ error: "Invalid features format. Must be an array of strings!" });
        }
      }
      
      // Validate required fields
      if (!category || !title || !Array.isArray(features)) {
          return res.status(400).json({ error: "Category, title, and features (as an array) are required!" });
      }

      const domain = new Domain({ category, title, features });

      await domain.save();
      res.status(201).json({ message: "Domain added successfully!", domain });

  } catch (error) {
      console.error("Error adding domain:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Domain API
router.put("/updateDomain/:id",upload.none(), async (req, res) => {
    try {
        const { id } = req.params;
        let { title, features, category } = req.body;

        // Parse features if it's a stringified JSON array
        if (typeof features === "string") {
            try {
                features = JSON.parse(features);
            } catch (error) {
                return res.status(400).json({ error: "Invalid features format. Must be a valid JSON array!" });
            }
        }

        if (!title || !Array.isArray(features) || !category) {
            return res.status(400).json({ error: "Category, title, and features (as an array) are required!" });
        }

        const updatedDomain = await Domain.findByIdAndUpdate(id, { title, features, category }, { new: true });

        if (!updatedDomain) {
            return res.status(404).json({ error: "Domain not found" });
        }

        res.json({ message: "Domain updated successfully!", domain: updatedDomain });

    } catch (error) {
        console.error("Error updating domain:", error);
        res.status(500).json({ error: "Failed to update domain" });
    }
});

module.exports = router;
