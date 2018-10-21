// connection express
const express = require('express');

const mongoose = require('mongoose');

const path = require('path');
const keys = require('./keys')

const frontendPath = path.join(__dirname, 'frontend');

mongoose.connect(keys.mongoURI)

  // if connect - Ok
  .then(() => console.log('MongoDb connect'))
  // if connect - NOT
  .catch(err => console.error(err))

const port = process.env.PORT || 5000;

// create object express
const app = express();

app.use(express.static(frontendPath));

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
})