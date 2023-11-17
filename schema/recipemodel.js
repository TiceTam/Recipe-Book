// user model
const mongoose = require('mongoose');

const ingredients = new mongoose.Schema({
    ingredient: String,
});

const instructions = new mongoose.Schema({
    instruction: String,
});

const recipeObject = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },

    ingredients: [ingredients],

    instructions: [instructions],

    image: {
        type: String,
        required: false,
    }

});

module.exports = mongoose.model('recipes', recipeObject);