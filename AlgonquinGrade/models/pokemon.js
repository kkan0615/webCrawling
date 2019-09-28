module.exports = (sequelize, DataTypes) => (
    sequelize.define('pokemon', {
        bookId: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: true, // After test, plz change it to false !
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        timestampes: true,
        paranoid: true,
        charset: 'utf8',
        collate:'utf8_general_ci',
    })
);
