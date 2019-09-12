const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const pokeDB = require('./pokemonDB');

const router = express.Router();

router.get('/', async(req, res, next) => {
    pokeDB();
});

module.exports = router;