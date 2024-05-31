const express = require('express');
// Creating router object
const router = new express.Router();
const user = require('../Controllers/userLogic'); // Check this path
const adminmiddleware = require('../Middleware/adminmiddleware');

// User register
router.post('/user/register', user.register);

// User login
router.post('/user/login', user.login);

//admin 
router.post('/admin',adminmiddleware,user.admin)

module.exports = router; 
