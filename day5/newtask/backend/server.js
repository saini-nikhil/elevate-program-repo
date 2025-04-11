const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authRoutes = require("./routes/auth.routes")
const empRoutes = require("./routes/emp.routes")
const cloudinary = require("./config/claudinary");
const connection = require('./config/db');

dotenv.config()

// if the file is not exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const app = express()
 
// Enhanced CORS configuration

app.use(cors());
app.use(express.json());

// Debug endpoint for checking server status
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: 'Server is running',
        time: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development' 
    });
});

app.use("/api/auth", authRoutes);
app.use("/api", empRoutes);

const PORT = process.env.PORT
app.listen(PORT, async () =>{
    try {
        await connection
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error in connecting to database:", error);
    }
    console.log(`Server running on port ${PORT}`);
})  