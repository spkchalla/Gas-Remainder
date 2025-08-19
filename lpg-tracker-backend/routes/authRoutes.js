const express = require('express');
const router = express.Router();
const User = require('../models/User');

// API for register

router.post('/register', async (req, res)=>{
    try{
        const {
            name,
            email,
            password
        } = req.body;

            const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User Already exists"});
        }

        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        res.status(201).json(newUser);



    }catch(error){
        console.error("Registration error:", error);
        res.status(500).json({message: "Server Error"});
    }
});

// API for login

router.post('/login',async(req, res)=>{
     try{
        const {
            email,
            password
        } = req.body;

            const existingUser = await User.findOne({email});
            
        if(!existingUser){
            return res.status(404).json({message: `User with email ${email} not found`})
        }
        if(existingUser.password !== req.body.password)
            return res.status(401).json({message: `The password is incorrect`});
        

        return res.status(200).json({message:`Welcome ${existingUser.name}`,
        "userId": `${existingUser._id}`}
        )



    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server Error",
            userId: existingUser._id
        });
    }
})



module.exports = router;