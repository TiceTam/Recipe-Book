const path = require('path');
const port = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(cors());

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});