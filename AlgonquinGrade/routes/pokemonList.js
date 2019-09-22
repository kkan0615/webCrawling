const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const pokeList = require('../routes/getPokemons');

const router = express.Router();

router.get('/', async(req, res, next) => {
    const list = pokeList();
    console.log(list);

    return res.render('pokemonList/index', {
        title: 'Pokemon List',
        user: req.user,
        list: list,
    });
});

module.exports = router;