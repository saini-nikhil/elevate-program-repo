const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/Backend"

const connection = mongoose.connect(url).then(()=>{
    console.log("connected succeful")
})
.catch((err) => {
    console.log(err)
})


module.exports = connection