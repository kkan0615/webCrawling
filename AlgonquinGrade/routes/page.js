const express = require('express');
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Food, Store, Product } = require('../models');

/* Main page(index page) */
router.get('/', async(req, res, next) => {
    res.render('index', {
        title: 'Welcome',
        user: req.user,
    });
});

/* Register main page */
router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('auth/join', {
        title: 'Register page',
        user: req.user,
        joinError: req.flash('joinError')
    });
});

/* Login page */
router.get('/login', isNotLoggedIn, (req, res, next) => {
    const email = req.cookies.email;

    res.render('auth/login', {
        title: 'Login Page',
        user: req.user,
        email: email,
        loginError: req.flash('loginError')
    });
});

module.exports = router;