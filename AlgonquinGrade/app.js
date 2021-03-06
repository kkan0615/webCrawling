const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
require('dotenv').config();

const indexRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const pokemonListRouter = require('./routes/pokemonList');
const pokemonDB = require('./routes/pokemonDB');
//pokemonDB();

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
});
app.set('port', process.env.PORT || 8001);
app.use(sessionMiddleware);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/list', pokemonListRouter);

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is wating you!');
});