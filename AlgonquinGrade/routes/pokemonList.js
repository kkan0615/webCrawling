const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Pokemon, Type } = require('../models');
const pokeList = require('../routes/getPokemons');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const list = await Pokemon.findAll({
            include: {
                model: Type,
            }
        });

        console.log(list[1].type); //Type 이 하나만 나온다 이거 수정하자!
        return res.render('pokemonList/index', {
            title: 'Pokemon List',
            user: req.user,
            list: list,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/addPokemon', async(req, res, next) => {
    try {
        const types = await Type.findAll();

        //console.log(list.type);
        return res.render('pokemonList/addPokemon', {
            title: '포켓몬 추가하기',
            user: req.user,
            types,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/addPokemon', async(req, res, next) => {
    try {
        const { name, bookNum, image,  type_one, type_two } = req.body;

        const typeOne = await Type.findOne({
            where: { id: type_one }
        });

        const typeTwo = await Type.findOne({
            where: { id: type_two }
        });

        let bookId;
        if(bookId < 10) {
            bookId = '00' + bookNum;
        } else if(bookId >= 10 && bookId < 100) {
            bookId = '0' + bookNum;
        } else {
            bookId = bookNum;
        }

        await Pokemon.create({
            name,
            bookId,
            image,
            typeId: typeOne.id,
            typeTwoId: typeTwo.id,
        });

        return res.redirect('/list');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* Refresh pokemon list from JSON */
router.post('refresh', async(req, res, next) => {
    const list = pokeList();
});

module.exports = router;