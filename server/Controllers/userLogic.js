const users = require("../models/userModel")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userotp=require('../models/userOtp')
const nodemailer=require("nodemailer")
 require("dotenv").config()





exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate that password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json("Passwords do not match.");
  }

  try {
    // Check for existing user by email first
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists! Please login.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new users({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the new user's data
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(`Register API failed: ${error.message}`);
  }
};





exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await users.findOne({email});
        if (existUser) {
            // Compare the hashed password with the provided password
            const validPassword = await bcrypt.compare(password, existUser.password);
            if (validPassword) {
                // Generate token if the password is valid
                const token = jwt.sign({ _id: existUser._id }, "supersecretkey123");
                console.log(token);
                res.status(200).json({ user: existUser, token });
            } else {
                res.status(404).json("Incorrect email or password");
            }
        } else {
            res.status(404).json("Incorrect email or password");
        }
    } catch (error) {
        res.status(401).json(`Login API failed ${error}`);
    }
};







exports.dummyAPI = async (req, res) => {
  try {
      res.status(200).json({ userId: req.payload, message: 'Admin accessed!!' })
  } catch (err) {
      res.status(401).json(err)
    }
}




exports.admin=async(req,res)=>{
  res.status(200).json("admin registred successfully")
}

