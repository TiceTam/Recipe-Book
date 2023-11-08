// user model
const mongoose = require('mongoose');


const userObject = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    isConfirmed: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    verifyCode: {
        type: Number
    },


});

module.exports = mongoose.model('users', userObject);