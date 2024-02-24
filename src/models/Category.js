const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('categorie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Category;