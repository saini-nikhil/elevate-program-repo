const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productname : {type : String , required : true},
    detail : {type : String , required : true , unique : true},
    price : {type : String , required : true , unique : true},
    password : String ,
    createdBy: {type : mongoose.Schema.Types.ObjectId , ref : "user" , required : true }
})

module.exports = mongoose.model("product" , productSchema)