<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    googleId:{
type:String
    },
    role: {
      type: String,
      default: "User",
    },
    //   role: {
    //     type: String,
    //     enum: ['User', 'Admin'],
    //     default: 'User'
    // },
    image: {
      type: String,
      default: null,
    },
=======




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
>>>>>>> e7c358c0ddec1c61ff4fc63c4c9c4ec416b7142f
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);
module.exports = users;
