const  Emp= require("../models/emp.model");
const cloudinary = require("../config/claudinary");

const createEmp = async (req, res) => {
  try {
    const { name, position, contact } = req.body;
    const profilePic = req.file ? req.file.path : null ;
    const userId = req.user.id;

    let imageUrl = "";
    if (profilePic) {
      const result = await cloudinary.uploader.upload(profilePic, {
        folder: "employees",
      });
      imageUrl = result.secure_url;
    }
    const newEmp = new Emp({
      name,
      position,
      contact,
      profilePicture: imageUrl,
      createdBy: userId,
    });
    await newEmp.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmp,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during employee creation" });
  }
};

const getEmp = async (req, res) => {
    try {
      const userId = req.user.id;
     
      const emps = await Emp.find({ createdBy: userId });
  
      console.log("Retrieved employees for user:", userId); 
  
      res.status(200).json(emps);
    } catch (error) {
      console.error("Error retrieving employees:", error);
      res.status(500).json({ message: "Server error during fetching employees" });
    }
  };

const getEmpbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const emp = await Emp.findOne({ _id: id, createdBy: userId });

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(emp);
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    res
      .status(500)
      .json({ message: "Server error during fetching employee by ID" });
  }
};

const deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedEmployee = await Emp.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ message: "Employee not found or not authorized" });
    }

    

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error during employee deletion:", error);
    res.status(500).json({ message: "Server error during employee deletion" });
  }
};


const updateEmp = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, position, contact } = req.body;
      const profilePic = req.file ? req.file.path : null;
      const userId = req.user.id;
  
      console.log("Updating employee:", id);
      const existingEmployee = await Emp.findOne({
        _id: id,
        createdBy: userId,
      });
  
      if (!existingEmployee) {
        return res
          .status(404)
          .json({ message: "Employee not found or not authorized" });
      }
  
      let imageUrl = "";
      if (profilePic) {
      
        const result = await cloudinary.uploader.upload(profilePic, {
          folder: "employees",
        });
        imageUrl = result.secure_url;
        console.log("Profile picture uploaded to Cloudinary:", imageUrl);
      }
  
  
      const updateData = {
        name,
        position,
        contact,
      };
  
      if (imageUrl) {
        updateData.profilePicture = imageUrl;
      }
  
      const updatedEmployee = await Emp.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
     
  
      res.status(200).json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error during employee update:", error);
      res.status(500).json({ message: "Server error during employee update" });
    }
  };

  module.exports = {
    createEmp,
    getEmp,
    getEmpbyId,
    updateEmp,
    deleteEmp,
  };