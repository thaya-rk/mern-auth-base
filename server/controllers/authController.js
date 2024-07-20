const User = require('../models/user');
const { hashpassword, comparepassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
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

// Login Endpoint
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
    if (match) {
      const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true }); // Set httpOnly for security
      return res.json(user);
    } else {
      return res.status(400).json({ error: "Password does not match!" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Profile Endpoint
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET,{}, (err, user) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });
      res.json(user);
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

// Logout Endpoint
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logout successful" });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
};
