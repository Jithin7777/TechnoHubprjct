const express = require('express');
// Creating router object
const router = new express.Router();
const user = require('../Controllers/userLogic'); 
const jwtMiddleware = require('../Middleware/jwtMiddleware');
const emailVerification = require("../Controllers/emailController");
// const rbacMiddleware = require('../Middleware/adminmiddleware');

// User register
router.post('/user/register', user.register);

// User login
router.post('/user/login', user.login);

//admin 
router.post("/api/dummyRoute", jwtMiddleware, user.dummyAPI);

//user otp
// router.post("/user/sendotp",user.userotpSend)

router.post("/emailGeneration",emailVerification.sendEmail);
router.post("/emailverification",emailVerification.verifyOtp);
module.exports = router; 
