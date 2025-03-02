const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {

    });
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const tokenHeader = req.header("Authorization");
    
    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. Invalid token format." });
    }

    const token = tokenHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = { generateToken, verifyToken };
