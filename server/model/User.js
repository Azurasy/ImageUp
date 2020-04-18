const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

module.exports = User;