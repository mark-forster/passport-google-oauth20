const express= require('express');
const router= express.Router();
const userController= require('../controllers/user.controller')
const passport= require('passport')
router.get('/', userController.getIndex);

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

  router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

module.exports= router;