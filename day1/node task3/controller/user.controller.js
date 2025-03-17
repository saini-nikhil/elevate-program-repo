
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/user.model");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existinguser = await userSchema.findOne({ email });
    if (existinguser)
      return res.status(400).json({ message: "email already in use" });

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
} catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};


const login = async (req , res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "invalid email" });

    const ismatch = await bcrypt.compare(password , user.password)

    if (!ismatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({id: user._id} , "my_Secret_key")
      
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error login user", error });
    }
}

module.exports = {signup , login}