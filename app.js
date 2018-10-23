// connection express
const express = require('express')

// connection mongoose
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const path = require('path');

const postRouter = require('./routes/post');

const keys = require('./keys');

const frontendPath = path.join(__dirname, 'frontend');

mongoose.connect(keys.mongoURI)

//promise
// if connect - Ok
    .then(() => console.log('MongoDb connect'))
    // if connect - NOT
    .catch(err => console.error(err));

const port = process.env.PORT || 5000;

// create object express
const app = express();

app.use(bodyParser.json());

app.use('/api/post', postRouter);

app.use(express.static(frontendPath));

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});