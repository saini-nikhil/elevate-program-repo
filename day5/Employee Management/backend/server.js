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

const app  = express()
 

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api", empRoutes);

const PORT = process.env.PORT
app.listen(PORT, async () =>{
    try {
        await connection
    } catch (error) {
        console.log("error in connecting to db")
    }
console.log(`Server running on port ${PORT}`);
})  