const path = require('path');
const port = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const User = require('./schema/usermodel');
const Recipe = require('./schema/recipemodel');
const Like = require('./schema/likemodel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.set('port', (process.env.PORT || 3001));

app.use(express.static(path.join(__dirname + "/client/build")));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
      if (err) {
        return res.status(500).send(err)
      }
    })
});

//Login 
app.post('/api/login', async (req, res) =>{
    const {username, password} = req.body;
    
    
    const user = await User.findOne({ username });

    if (!user) 
    {
        return res.status(404).json({ error: 'User not found' });
    }

    else
    {
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(!passwordsMatch){
            return res.status(404).json({error: 'Password Invalid'});
        }
        else{
            return res.status(200).json({userID: user._id});
        }
    }

});

//Registration
app.post('/api/signup', async (req, res)=>{
    const {username, password, email} = req.body;

    const existingUser = await User.findOne({username});

    if(existingUser){
        return res.status(404).json({error: "User Already Exists"});
    }

    //generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Generate verification code
    const min = 100000;
    const max = 999999;
    const code = Math.floor((Math.random() * (max - min + 1))) + min;

    const user = new User({
        username,
        email,
        password: hashedPassword,
        verifyCode: code
    });

    //save the user to the database.
    await user.save();

    return res.status(200).json({mess: "Successfully Registered"});

});

//Add Recipe.
app.post('/api/addrecipe', async (req, res)=>{
    const {recipeName, ingredients, instructions, image} = req.body;

    const recipe = new Recipe({
        recipeName,
        ingredients,
        instructions,
        image
    });

    await recipe.save();

    return res.status(200).json({mess: "Successfully added recipe"});

});


//TODO: Search Recipes
app.post('/api/searchrecipes', async(req, res)=>{
    const {recipeName} = req.body;

    const results = await Recipe.find({recipeName: {$regex: recipeName, $options: 'i'}});

    if(results){
        console.log('recipes found: ');
        console.log(results);
        return res.status(200).json({error: '', recipes: results});
      } else{
        console.log('recipes not found');
        return res.status(404).json({error: 'recipes not found'})
      }
});

//TODO: Load Recipes
app.post('/api/loadrecipes', async(req, res)=>{
    const results = await Recipe.find({});
    console.log('recipes:');
    console.log(results);
    return res.status(200).json({recipes: results});
});

//TODO: Add recipe to Likes
app.post('/api/addrecipelikes', async(req, res)=>{
    const {userID, recipeID} = req.body;
    const existingLike = await Like.findOne({recipeID: recipeID, userID: userID});
    if(existingLike){
        return res.status(200).json({err: "like already exists."});
    }
    const like = new Like({
        recipeID,
        userID
    });
    
    await like.save();

    return res.status(200).json({mess: "Successfully added to likes"});
});


//TODO: Search through users likes
app.post('/api/searchlikes', async(req,res)=>{
    const {userID, recipeName} = req.body;
    const likes = await Like.find({userID: userID});
    let recipes = [];
    let results = [];
    let recipeNames = [];
    let i = 0;
    console.log(likes);
    for(const like of likes){
        let recipeID = like.recipeID;
        console.log(recipeID);
        recipes[i] = await Recipe.find({_id: recipeID});
        recipeNames.push(recipes[i].recipeName);
        i += 1;
    }
    console.log(recipeNames);
    recipeNames.filter((el) => el.toLowerCase().includes(recipeName.toLowerCase()));
    console.log(recipeNames);

    for(let i = 0; i< recipeNames.length; i++){
        for(let j = 0; j < recipes.length; j++){
            if(recipeNames[i].toLowerCase() == recipes[j].recipeName.toLowerCase()){
                results.push(recipes[j]);
            }
        }
    }

    return res.status(200).json({recipes: results});

});


//TODO: Load users likes
app.post('/api/loadlikes', async (req, res)=>{
    const {userID} = req.body;
    const likes = await Like.find({userID: userID});
    let recipes = [];
    let i = 0;
    console.log(likes);
    for(const like of likes){
        let recipeID = like.recipeID;
        console.log(recipeID);
        recipes[i] = await Recipe.find({_id: recipeID});
        i += 1;
    }

    return res.status(200).json({recipes: recipes});
    
    
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

