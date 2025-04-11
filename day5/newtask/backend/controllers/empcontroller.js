const  Emp= require("../models/emp.model");
const cloudinary = require("../config/claudinary");

const createEmp = async (req, res) => {
  try {
    const { name, position, contact } = req.body;
    const profilePic = req.file ? req.file.path : null ;
    const userId = req.user.id;
    
    console.log("Creating employee:", { name, position, contact, userId });

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
    console.log("Employee created:", { id: newEmp._id, name: newEmp.name });
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmp,
    });
  } catch (error) {
    console.error("Error during employee creation:", error);
    res.status(500).json({ message: "Server error during employee creation" });
  }
};

const getEmp = async (req, res) => {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      console.log("Fetching employees for user:", { userId, page, limit, skip });
     
      const emps = await Emp.find({ createdBy: userId })
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 });
  
      const total = await Emp.countDocuments({ createdBy: userId });
      
      console.log(`Found ${emps.length} employees for user ${userId}, total: ${total}`);
  
      res.status(200).json({
        employees: emps,
        pagination: {
          totalEmployees: total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          limit
        }
      });
    } catch (error) {
      console.error("Error retrieving employees:", error);
      res.status(500).json({ message: "Server error during fetching employees" });
    }
  };

const getAllEmps = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    console.log("Admin fetching all employees:", { page, limit, skip });
    
    const emps = await Emp.find()
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .populate('createdBy', 'username email');
    
    const total = await Emp.countDocuments();
    
    console.log(`Admin found ${emps.length} total employees, total count: ${total}`);
    
    res.status(200).json({
      employees: emps,
      pagination: {
        totalEmployees: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Error retrieving all employees:", error);
    res.status(500).json({ message: "Server error during fetching all employees" });
  }
};

const getEmpbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    console.log("Fetching employee by ID:", { id, userId, isAdmin });

    const query = isAdmin ? { _id: id } : { _id: id, createdBy: userId };

    const emp = await Emp.findOne(query);

    if (!emp) {
      console.log("Employee not found:", { id, userId });
      return res.status(404).json({ message: "Employee not found" });
    }
    
    console.log("Employee found:", { id: emp._id, name: emp.name });
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
    const isAdmin = req.user.role === 'admin';
    
    console.log("Deleting employee:", { id, userId, isAdmin });
    
    const query = isAdmin ? { _id: id } : { _id: id, createdBy: userId };
    
    const deletedEmployee = await Emp.findOneAndDelete(query);

    if (!deletedEmployee) {
      console.log("Employee not found for deletion:", { id, userId });
      return res
        .status(404)
        .json({ message: "Employee not found or not authorized" });
    }

    console.log("Employee deleted:", { id: deletedEmployee._id, name: deletedEmployee.name });
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
      const isAdmin = req.user.role === 'admin';
  
      console.log("Updating employee:", { id, userId, isAdmin, name, position, contact });
      
      const query = isAdmin ? { _id: id } : { _id: id, createdBy: userId };
      
      const existingEmployee = await Emp.findOne(query);
  
      if (!existingEmployee) {
        console.log("Employee not found for update:", { id, userId });
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
  
      console.log("Employee updated:", { id: updatedEmployee._id, name: updatedEmployee.name });
  
      res.status(200).json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error during employee update:", error);
      res.status(500).json({ message: "Server error during employee update" });
    }
  };

const debugEmps = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    console.log("Debug endpoint fetching employees with pagination:", { page, limit, skip });
    
    const total = await Emp.countDocuments();
    
    const employees = await Emp.find()
      .populate('createdBy', 'username email')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });
    
    console.log(`Debug endpoint found ${employees.length} employees (page ${page}/${Math.ceil(total/limit)})`);
    
    res.status(200).json({
      message: "Debug employee information",
      count: total,
      employees: employees,
      pagination: {
        totalEmployees: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Debug employee endpoint error:", error);
    res.status(500).json({ message: "Server error in debug employee endpoint" });
  }
};

  module.exports = {
    createEmp,
    getEmp,
    getEmpbyId,
    updateEmp,
    deleteEmp,
    getAllEmps,
    debugEmps
  };