const users = require("../models/userModel")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


 
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword, googleId } = req.body;

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

    let userId;
    if (googleId) {
      // Check for existing user with Google ID (if allowing registration with Google ID)
      const existingGoogleUser = await users.findOne({ googleId });
      if (existingGoogleUser) {
        return res.status(400).json("Google ID already exists! Please login.");
      }
      userId = googleId;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new users({
      username,
      email,
      password: hashedPassword,
      googleId: userId, 
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(`Register API failed: ${error.message}`);
  }
};


// exports.register = async (req, res) => {
//   const { username, email, password, confirmPassword } = req.body;

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

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new users({
//       username,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();

//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json(`Register API failed: ${error.message}`);
//   }
// };


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




exports.admin=async(req,res)=>{
  res.status(200).json("admin registred successfully")
}