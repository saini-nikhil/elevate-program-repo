const mongoose = require("mongoose")


const empScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,  // URL of the image stored in Cloudinary
        required: true
    }
})

module.exports = mongoose.model("emp" , empScheme)