require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const app = express();
// const flash = require('flash');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJSON = require('./swagger.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'Ini rahasia banget',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.set("view engine", "ejs");
app.set('views', __dirname);

const passport = require('./lib/passport');
app.use(passport.initialize())
app.use(passport.session())

app.use('/public', express.static('public'))

app.use(cors())
// app.use(flash())

const authRoute = require('./router/auth');
const usersRoute = require('./router/users');
const productRoute = require('./router/product');
const tawarRoute = require('./router/tawar')
const transaksiRoute = require('./router/transaksi')
const wishlistRoute = require('./router/wishlist')
const notifRoute = require('./router/notif')

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authRoute);
app.use(usersRoute);
app.use(productRoute);
app.use(tawarRoute);
app.use(transaksiRoute);
app.use(wishlistRoute)
app.use(notifRoute)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

module.exports = app