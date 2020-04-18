const Sequelize = require('sequelize');
const db = require('../database');

const Image = db.define('images', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
  },
  uuid: {
    type: Sequelize.STRING(14),
    unique: true,
  },
  title: {
    type: Sequelize.STRING(128),
  },
  exposure: {
    type: Sequelize.STRING(8),
  },
  expiration: {
    type: Sequelize.INTEGER.UNSIGNED,
  },
  file_name: {
    type: Sequelize.STRING(128),
  },
  file_ext: {
    type: Sequelize.STRING(16),
  },
  base_url: {
    type: Sequelize.STRING(128),
  },
});

module.exports = Image;
