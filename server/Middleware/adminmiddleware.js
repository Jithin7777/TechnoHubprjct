const users=require('../models/userModel')

const adminmiddleware=async(req,res,next)=>{
    try {
        const email=req.body.email;
        const existinguser=await users.findOne({email:email})
        if(!existinguser){
            return res.status(403).json("user not found")
        }

        if(existinguser.role !=="Admin"){
            return res.status(403).json("access denied")
    } 
    else{
        next()
    }
}
    catch (error) {
       res.status(404).json("internal server error") 
    }
}

module.exports=adminmiddleware;