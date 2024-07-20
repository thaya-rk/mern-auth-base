const User = require('../models/user');
const { hashpassword, comparepassword } = require("../helpers/auth");
const jwt=require('jsonwebtoken');

const test = (req, res) => {
  res.json("test is working");
};

// register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password is required or length mismatch" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedpassword = await hashpassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Check if password matches
    const match = await comparepassword(password, user.password);
    if(match){
        jwt.sign({email:user.email, id:user._id, name:user.name},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
        })
    }
    if (!match) {
      return res.json({ error: "password not match!!" });
    }

    // Respond with success message
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser
};
