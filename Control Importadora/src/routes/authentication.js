const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// ingresar usuario
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// iniciar sesion
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('dpi', 'Dpi es requerido').notEmpty();
  req.check('password', 'Contraseña es requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;
