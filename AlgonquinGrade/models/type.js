module.exports = (sequelize, DataTypes) => (
    sequelize.define('type', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
        timestampes: true,
        paranoid: true,
        charset: 'utf8',
        collate:'utf8_general_ci',
    })
);
