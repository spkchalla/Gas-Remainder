const express = require("express");
const router = express.Router();
const Cylinder = require("../models/Cylinder");
const User = require('../models/User');

// API for Booking

router.post("/submit", async (req, res) => {
  try {
    const { userId, cylinderCount, lastBookedDate, frequency } = req.body;

    if (!userId || !cylinderCount || !lastBookedDate) {
      return res.status(400).json({ message: `Missing required fields` });
    }

    const existingUser = await Cylinder.findOne({userId});
    if(existingUser){
        existingUser.cylinderCount = cylinderCount;
        existingUser.lastBookedDate = lastBookedDate;
        existingUser.frequency = frequency;

        await existingUser.save();
        res.status(200).json({message: "User data updated", existingUser})
    }
    else{
        const newEntry = new Cylinder({
        userId,
        cylinderCount,
        lastBookedDate,
        frequency: frequency || 45,
        });
        await newEntry.save();
        res.status(201).json(newEntry);
        console.log(newEntry);
    }
  } catch (error) {
    console.error("Cylinder submission error:", error);
    res.status(500).json({ message: `Server Error` });
  }
});

// API to GET the Booking details

router.get("/user-data/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await Cylinder.findOne({ userId });
    if (!data) {
      return res.status(404).json({ message: "Data not Found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
