// connection express
const express = require('express');

const path = require('path');

const frontendPath = path.join(__dirname, 'frontend');

const port = process.env.PORT || 5000;

// create object express
const app = express();

app.use(express.static(frontendPath));

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
})