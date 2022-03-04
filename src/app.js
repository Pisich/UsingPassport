const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth.route');

const app = express();

require('dotenv').config();
require('./config/passport');


app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['clave'] //clave para encriptar
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/html/home.html'));
});

app.get('/profile', (req, res) => {
  if (req.user !== undefined){
    res.status(200).send(req.user);
  } else {
    res.status(401).redirect('/auth/login');
  }
});

app.use('/auth', authRoute);

module.exports = app;
