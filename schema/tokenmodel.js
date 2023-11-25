// user model
const mongoose = require('mongoose');

const tokenObject = new mongoose.Schema({
    refreshToken: String
});

module.exports = mongoose.model('tokens', tokenObject);