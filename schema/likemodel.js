// user model
const mongoose = require('mongoose');

const likeObject = new mongoose.Schema({
    recipeID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId

});

module.exports = mongoose.model('likes', likeObject);