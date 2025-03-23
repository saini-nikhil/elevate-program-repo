const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    name : {type : String , required : true},
    position  : {type : String , required : true},
contact : {type : String , required : true},
profilePicture : {type : String},
createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: true
}


})

const Emp = mongoose.model("emps" , empSchema);
module.exports = Emp