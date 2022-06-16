const express = require('express');

const app = express();
const flash = require('flash');
const authRoute = require('./router/auth')
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'Ini rahasia banget',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

const passport = require('./lib/passport-local');
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(authRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });