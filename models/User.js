const mongoose = require('mongoose');

const userSignUp = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        max: 255,
        min: 4
    },
    email: {
        required: true,
        type: String,
        max: 255,
        min: 6
    },
    password: {
        required: true,
        type: String,
        max: 1024,
        min: 8
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("User", userSignUp)