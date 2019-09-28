module.exports = (sequelize, DataTypes) => (
    sequelize.define('pokemon_comment', {
        content: {
            type: DataTypes.STRING(), //Unlimited.
            allowNull: false,
        },
    }, {
        timestampes: true,
        paranoid: true,
        charset: 'utf8',
        collate:'utf8_general_ci',
    })
);
