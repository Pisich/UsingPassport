const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

// path prefix /auth

// GET auth/login
router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/public/html/login.html'));
});

// GET auth/google/login
router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// GET auth/logout
router.get('/logout', (req, res) => {
  req.logout(), req.session = null;
  res.redirect('/');
});

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed'
  }),
  function (req, res) {
    console.log(req.query.code);
    // Hasta aquí llega el req.user
    console.log('Logged in successfully!');
    res.redirect('/profile');
  }
);

// GET /verifyLogin
router.get('/verifyLogin', (req, res) => {
  if(req.user) {
    res.status(200).send('Logged in');
  } else {
    res.sendStatus(401);
  }
});


module.exports = router;