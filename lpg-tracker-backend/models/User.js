// This is the schema for the user table

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
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
        required: true
    }
});

// to export this to the other files

const User = mongoose.model('User', userSchema);
module.exports = User;