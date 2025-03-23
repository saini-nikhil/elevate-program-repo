const empModel = require("../model/emp.model")


const cloudinary = require('cloudinary').v2;

// Employee CRUD operations
const createemp = async (req, res) => {
    const { name, position, contact } = req.body;
    const { file } = req;

    try {
        let profilePictureUrl = '';
        if (file) {
            const result = await cloudinary.uploader.upload(file.path);
            profilePictureUrl = result.secure_url;
        }

        const newEmployee = new empModel({ name, position, contact, profilePicture: profilePictureUrl });
        await newEmployee.save();

        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};


// const createemp = async (req , res) => {
//     try {
//         const {name ,position ,contact , profilePicture } = req.body
//         const newemp = empModel({
//             name ,position ,contact , profilePicture 
//         })
//         await newemp.save()
//         res.status(200).json(newemp);
        
//     } catch (error) {
//         res.status(500).json({ message: "Error creating booking", error: error.message }); 
//     }
// }

const getemp = async (req , res) => {
    try {
      const emp = await empModel.findOne()
      res.status(200).json(emp);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
}

module.exports = {getemp , createemp}