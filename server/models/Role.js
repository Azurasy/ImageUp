const Sequelize = require('sequelize');
const db = require('../database/db');

const Role = db.define('roles', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
});

module.exports = Role;
