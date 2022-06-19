const express = require('express');

const app = express();

const authRoute = require('./router/auth');
const usersRoute = require('./router/users');

const registerRoute = require('./router/register');

app.use(express.json());

app.use(authRoute);
app.use(usersRoute);

app.use(registerRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
