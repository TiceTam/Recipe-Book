const path = require('path');
const port = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const User = require('./schema/usermodel');
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
        if(user.password != password){
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

    const user = new User({
        username,
        password,
        email,
    });

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});