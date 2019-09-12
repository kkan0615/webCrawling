const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const { email, fullName, password, number } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if(exUser) {
            req.flash('joinError', 'This email has been registered');
            return res.redirect('/join/userJoin');
        }
        const bash = await bcrypt.hash(password, 12);

        await User.create({
            email,
            fullName,
            number,
            password: bash,
        });

        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if(!user) {
            req.flash('loginError', info.message);
            return res.redirect('/login');
        }

        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/login');
        });



    }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;