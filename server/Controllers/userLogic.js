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


<<<<<<< HEAD
// exports.register = async (req, res) => {
//   const { username, email, password, confirmPassword, role } = req.body;

//   // Validate that password and confirmPassword match
//   if (password !== confirmPassword) {
//     return res.status(400).json("Passwords do not match.");
//   }

//   try {
//     // Check for existing user by email first
//     const existingUser = await users.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json("User already exists! Please login.");
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user with the specified role
//     const newUser = new users({
//       username,
//       email,
//       password: hashedPassword,
//       role, // Set the role here
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Respond with the new user's data
//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json(`Register API failed: ${error.message}`);
//   }
// };

=======
>>>>>>> e7c358c0ddec1c61ff4fc63c4c9c4ec416b7142f



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




<<<<<<< HEAD


exports.dummyAPI = async (req, res) => {
  try {
      res.status(200).json({ userId: req.payload, message: 'Admin accessed!!' })
  } catch (err) {
      res.status(401).json(err)
    }
}


//email config
// const transporter=nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   service:"gmail",
//   auth:{
//     user:process.env.EMAIL,
//     pass:process.env.PASSWORD,
//   }
// })



// exports.userotpSend=async(req,res)=>{
//   const {email}=req.body;
//   if(!email){
//     res.status(400).json({error:"please enter your email"})
//   }
//   try {
//     const preuser=await users.findOne({email:email});

//     if(preuser){
//    const OTP=Math.floor(10000+Math.random()*900000);
//    const existEmail=await userotp.findOne({email:email});
//    if(existEmail){
//     const updateData=await userotp.findByIdAndUpdate({_id:existEmail._id},{
//       otp:OTP
//     },{new:true}
//   );
//   await updateData.save();

//   const mailOptions={
//     from:process.env.EMAIL,
//     to:email,
//     subject:'Sending email for OTP validation',
//     text:`OTP:-${OTP}`
//   }
// transporter.sendMail(mailOptions,(error,info)=>{
//   if(error){
//     console.log("error",error);
//     res.status(400).json({error:"email not send"})
//   }else{
//     console.log("Email sent",info.response);
//     res.status(200).json({msg:"Email sent successfully"})
//   }
// })

//    }else{
//     const saveOtpData=new userotp({
//       email,otp:OTP
//     })
//     await saveOtpData.save();
   
//     const mailOptions={
//       from:process.env.EMAIL,
//       to:email,
//       subject:'Sending email for OTP validation',
//       text:`OTP:-${OTP}`
//     }
//   transporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//       console.log("error",error);
//       res.status(400).json({error:"email not send"})
//     }else{
//       console.log("Email sent",info.response);
//       res.status(200).json({msg:"Email sent successfully"})
//     }
//   })
  
//    }
//     }
//     else{
//       res.status(400).json({error:"this user is not exist in your db"})
//     }
//   } catch (error) {
//     res.status(400).json({error:"invalid Details",error})
//   }
// }
=======
exports.admin=async(req,res)=>{
  res.status(200).json("admin registred successfully")
}
>>>>>>> e7c358c0ddec1c61ff4fc63c4c9c4ec416b7142f
