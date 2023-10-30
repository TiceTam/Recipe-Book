const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname + "../frontend/build")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });