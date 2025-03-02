const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();
const multer = require("multer");
const upload = multer();
// Add Contact API
router.post("/addContact", upload.none(), async (req, res) => {
    try {
        const { category, address, phone, email } = req.body;

        if (!category || !address || !phone || !email) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const contact = new Contact({
            category: category.trim(),
            address: address.trim(),
            phone: phone.trim(),
            email: email.trim(),
        });

        await contact.save();
        return res.status(201).json({ message: "Contact added successfully!", contact });
    } catch (error) {
        console.error("Error adding contact:", error);
        return res.status(500).json({ error: "Internal Server Error" }); // Always return JSON
    }
});



// Update Contact API
router.put("/updateContact/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;
        const { category, address, phone, email } = req.body;

        console.log("Update request body:", req.body);

        // Debugging: Log each field individually
        console.log("Category:", category);
        console.log("Address:", address);
        console.log("Phone:", phone);
        console.log("Email:", email);

        if (!category || !address || !phone || !email) {
            return res.status(400).json({ error: "All fields (category, address, phone, email) are required!" });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { 
                category: category.trim(), 
                address: address.trim(), 
                phone: phone.trim(), 
                email: email.trim() 
            },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact record not found!" });
        }

        res.json({ message: "Contact updated successfully!", contact: updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Failed to update contact" });
    }
});

module.exports = router;