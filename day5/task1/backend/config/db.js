const mongoose = require("mongoose")

let url = "mongodb+srv://saininikhil:HelloWrold54321@cluster0.hldvp.mongodb.net/Employees"
const connection = mongoose.connect(url).then(() => 
    console.log("mongose Connected"))
.catch((err) => console.log(err) )

module.exports = connection
