const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../Models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser')

JWT_SECRET = "HELLOTHISISMYAUTHTOKEN";

//ROUTE:1 Creating a User using : POST: "API/AUTH/CREATEUSER."
router.post('/createuser', [
    body('name','Enter a Valid Name').isLength({ min: 3 }),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password Must Be Atleast  5 Character').isLength({ min: 5 })
], 
    async(req,res)=>{
        let success = false;
    // if there is an error it will return Bad request//
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check wheather User  already Exists Or not//
    try {
        
    let user =await User.findOne({success, email : req.body.email})
    if (user){
        return res.status(400).json({success, error : "Sorry User Already Exist"})
    }
    //Converting Password into hash salt
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash( req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
         });
          
         const data = {
            user :{
                id : user.id
            }
         }
    const authToken = jwt.sign(data, JWT_SECRET); 
    success = true; 
         res.json({success, authToken});
       
    } catch (error) 
    { 
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
});

//ROUTE:2 AUTHENTICATION A USER USING : POST API/AUTH/LOGIN 

router.post('/login', [
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password cannot be blank').exists()
], 
    async(req,res)=>{
        let success = false;
    // if there is an error it will return Bad request//
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error : "Please login with correct crendetials"})
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            return res.status(400).json({success, error : "Please login with correct crendetials"})  
        }

        const data = {
            user :{
                id : user.id
            }
         }
    const authToken = jwt.sign(data, JWT_SECRET); 
    success = true; 
         res.json({ success, authToken});

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE:3 GET LOGIN USER DETAILS USING POST: "/API/AUTH/GETUSER  /LOGIN REQUIRED"

router.post('/getuser', fetchUser, async(req,res)=>{
    
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");  
    }
   
    })
module.exports = router