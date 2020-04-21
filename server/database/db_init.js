const Sequelize = require('sequelize');
const fs = require('fs');
const shortid = require('shortid');

// generate / load secret
let secret;
if (!fs.existsSync('./local/secret.key')) {
  secret = shortid.generate() + shortid.generate();
  fs.writeFileSync('./local/secret.key', secret);
} else secret = fs.readFileSync('./local/secret.key').toString();

// create database tables using models
createTables = (db) => {
  db.SECRET = secret;

  db.authenticate()
    .then(() => {
      console.log('Database connected');

      const User = require('../models/User');
      const Image = require('../models/Image');

      //const Role = require('./models/Role');
      //const UserRole = require('./models/UserRole');
      //Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
      //User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

      db.sync();
    })
    .catch((err) => console.error(err));
};

if (process.env.DB_DIALECT == 'sqlite') {
  const db = require('./db');
  createTables(db);
} else {
  // creates database before creating tables
  let createDb = new Sequelize(
    '',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
    }
  );

  createDb
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
    .then(() => {
      const db = require('./db');
      createTables(db);
    })
    .catch((err) => console.warn(err))
    .finally(() => createDb.close());
}
