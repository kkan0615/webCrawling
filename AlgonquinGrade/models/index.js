const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Pokemon = require('./pokemon')(sequelize, Sequelize);
db.Type = require('./type')(sequelize, Sequelize);
db.Pokemon_comment = require('./pokemon_comment')(sequelize, Sequelize);

/* Pokmon has two types */
db.Type.hasOne(db.Pokemon);
db.Pokemon.belongsTo(db.Type);
db.Type.hasOne(db.Pokemon, {as: 'typeTwo' });
db.Pokemon.belongsTo(db.Type, {as: 'typeTwo'});

/* Comment of Pokoen */
db.Pokemon.hasMany(db.Pokemon_comment);
db.Pokemon_comment.belongsTo(db.Pokemon);
db.User.hasMany(db.Pokemon_comment, {as: 'author'});
db.Pokemon_comment.belongsTo(db.User, {as: 'author'});

module.exports = db;