const express = require('express');

const app = express();

const authRoute = require('./router/auth')

app.use(express.json())

app.use(authRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });