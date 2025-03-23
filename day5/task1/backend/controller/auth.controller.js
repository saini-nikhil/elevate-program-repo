const authModel = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const genrateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    "access_Secret_key",
    { expiresIn: "15m" }
  );



  return { accessToken };
};
const signup = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;
    const existinguser = await authModel.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "email in use" });
    }
    let hashedpass = await bcrypt.hash(password, 10);
    const newUser = new authModel({
      name,
      email,
      password: hashedpass,
    });
    await newUser.save();
    res.status(200).json({ message: "user is created", newUser });
  } catch(err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid mail" });
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "invalid Creditional",
      });

    res.status(200).json({ message: "login Successful", tokens: genrateTokens(user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {signup , login}