// this is a schema to store the booking details

const mongoose = require("mongoose");

const cylinderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cylinderCount: {
        type: Number,
        required: true
    },
    frequency: {
        type: Number,
        default: 45
    },
    lastBookedDate: {
        type: Date,
        required: true
    }
}, 
    {
        timestamps: true
    }

);

const Cylinder = mongoose.model('Cylinder', cylinderSchema);
module.exports = Cylinder;
