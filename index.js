require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/config');
const path = require("path");

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(cors({
    origin: process.env.CLIENT_URL, // Read from .env
    credentials: true
}));

// Serve static assets
app.use("/public", express.static(path.join(__dirname, "/public/assets")));

// Routes
app.use('/api', require('./src/routes/UserRoutes'));
app.use('/api', require('./src/routes/HomeRoutes'));
app.use('/api', require('./src/routes/AboutRoutes'));
app.use('/api', require('./src/routes/ServicesRoutes'));
app.use('/api', require('./src/routes/PortfolioRoutes'));
app.use('/api', require('./src/routes/DomainRoutes'));
app.use('/api', require('./src/routes/TeamRoutes'));
app.use('/api', require('./src/routes/ClientRoutes'));
app.use('/api', require('./src/routes/BusinessRoutes'));
app.use('/api', require('./src/routes/ContactRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
