const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware')

router.get('/register', users.getSignupForm );
router.post('/register', catchAsync(users.register));

router.get('/login', users.getLoginForm );
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;
