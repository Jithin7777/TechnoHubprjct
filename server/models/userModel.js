// const mongoose=require('mongoose')
// const roles=require('../roles')
// const userSchema=new mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         // required:true,
//     },
//     role: {
//         type: String,
       
//         default: "User" // Default role if not assigned during registration
//       },

//     googleId: { 
//         type: String, 
//         // default:null, 
//         // sparse: true,
//         // unique:true
//         // optional: true,

//     },   
//      image:{
//         type:String
//     },
    
// },{ timestamps: true })

    

// const users=mongoose.model("users",userSchema)
// module.exports=users




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    default: "User"
  },
  googleId: {
    type: String,
    // default: null,
    sparse: true
  },
  image: {
    type: String,
    default: null
  },
}, { timestamps: true });

const users = mongoose.model('users', userSchema);
module.exports = users;
