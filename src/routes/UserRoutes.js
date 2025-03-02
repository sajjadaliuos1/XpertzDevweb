const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { generateToken, verifyToken } = require("../middleware/JwtToken");

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser);

        // ✅ Return the user object along with the token
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        const token = generateToken(user);
        res.status(200).json({ user: { _id: user._id, name: user.name, email: user.email }, auth: token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


// Get All Users
router.get("/userdetails", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete User
router.delete("/user/:id",verifyToken, async (req, res) => {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "User deleted successfully" });
});

// Update User
router.put('/updateuser/:id', verifyToken, async (req, res) => {
    try {
        const { password, ...updateFields } = req.body;
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const result = await User.updateOne({ _id: req.params.id }, { $set: updateFields });

        res.json({ message: "User updated successfully!", result });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
