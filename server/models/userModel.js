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
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);
module.exports = users;
