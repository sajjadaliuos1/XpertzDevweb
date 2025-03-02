const express = require("express");
const path = require("path");
const Team = require("../models/Team");
const upload = require("../middleware/upload");
const fs = require("fs");
const router = express.Router();

// Add team API
router.post("/addTeam", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image!" });
        }
        
        console.log("Received Request Body:", req.body);

        const { category, name,role , fblink } = req.body;

        if (!category || !name || !role) {
            return res.status(400).json({ error: "Category, name, and role are required!" });
        }

        const team = new Team({
            category,
            name,
            fblink: fblink || "", 
            role, 
            image: req.file.filename
        });

        await team.save();
        console.log("Saved Team:", team);
        res.status(201).json({ message: "Content added successfully!", team });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update Team API
router.put("/updateTeam/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { category, name,role , fblink } = req.body;
       
        let updateData = { category, name,role , fblink };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedTeam = await Team.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.json({ message: "Team updated successfully", Team: updatedTeam });
    } catch (error) {
        console.error("Error updating Team:", error);
        res.status(500).json({ error: "Failed to update Team" });
    }
});

module.exports = router;