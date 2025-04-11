const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
      const userId = req.user.id;
      
      console.log("Fetching profile for user ID:", userId);
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      console.log("User profile found:", user);
      res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
      });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error fetching profile' });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log("Signup attempt:", { username, email, role });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hasedPassword,
      role: role || 'employee' // Default to employee if not specified
    });
    await newUser.save();
    
    console.log("User created:", { id: newUser._id, username: newUser.username, role: newUser.role });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", { email });
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User authenticated:", { id: user._id, username: user.username, role: user.role });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Debug endpoint to check the system state
const debug = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      message: "Debug information",
      users,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        jwtSecret: process.env.JWT_SECRET ? "Set" : "Not set",
        port: process.env.PORT
      }
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    res.status(500).json({ message: "Server error in debug endpoint" });
  }
};

module.exports = { signup, login, getProfile, debug };
