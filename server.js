const path = require('path');
const port = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const User = require('./schema/usermodel');
const Recipe = require('./schema/recipemodel');
const Like = require('./schema/likemodel');
const Token = require('./schema/tokenmodel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');

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
    const userObject = {name : username}; 

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
            const refreshToken = jwt.sign(userObject, process.env.REFRESH_TOKEN_SECRET);
            
            const token = new Token({
                refreshToken
            });
        
            await token.save();

            const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, userID: user._id});
        }
    }

});

app.post('/api/token', async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)
    const existingToken = await Token.findOne({refreshToken: refreshToken});
    if (!existingToken) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

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


//Search Recipes
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

//Load All Recipes
app.post('/api/loadrecipes', async(req, res)=>{
    const results = await Recipe.find({});
    console.log('recipes:');
    console.log(results);
    return res.status(200).json({recipes: results});
});

//Add Recipe Like
app.post('/api/addrecipelikes', authenticateToken, async(req, res)=>{
    const {userID, recipeID} = req.body;
    const existingLike = await Like.findOne({recipeID: recipeID, userID: userID});
    if(existingLike){
        return res.status(404).json({err: "like already exists."});
    }
    const like = new Like({
        recipeID,
        userID
    });
    
    await like.save();

    return res.status(200).json({mess: "Successfully added to likes"});
});


//Search Recipe likes
app.post('/api/searchlikes', authenticateToken, async(req,res)=>{
    const {userID, recipeName} = req.body;
    const likes = await Like.find({userID: userID});
    let recipes = [];

    //get recipes for likes
    if (likes){
        for(let i = 0; i < likes.length; i++){
            let recipe = await Recipe.findOne({_id: likes[i].recipeID, recipeName: {$regex: recipeName, $options: 'i'}});
            if (recipe){
                recipes.push(recipe);
            }
        }

        return res.status(200).json({recipes: recipes});
    }  
    else{
        return res.status(404).json({err: "No recipes found"});
    } 

});


//Load Recipe Likes
app.post('/api/loadlikes', authenticateToken, async (req, res)=>{
    const {userID} = req.body;
    const likes = await Like.find({userID: userID});
    let recipes = [];
    let i = 0;
    console.log(likes);
    for(const like of likes){
        let recipeID = like.recipeID;
        console.log(recipeID);
        recipes[i] = await Recipe.findOne({_id: recipeID});
        i += 1;
    }

    return res.status(200).json({recipes: recipes});
    
    
});

//Delete Likes
app.post('/api/deletelikes', authenticateToken, async (req, res) =>{
    const {userID, recipeID} = req.body;
    console.log(userID, recipeID);

    await Like.deleteOne({userID: userID, recipeID: recipeID});
    //console.log(userID, recipeID);

    return res.status(200).json({mess: "Successfully deleted like"});
});

function authenticateToken(req, res, next){
    const token = req.body.accessToken;

    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

