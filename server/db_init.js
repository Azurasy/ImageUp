const Sequelize = require('sequelize');

createTables = (db) => {
  db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.warn(err));

  const User = require('./model/User');
  const Image = require('./model/Image');

  //const Role = require('./model/Role');
  //const UserRole = require('./model/UserRole');
  //Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
  //User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

  db.sync();
};

if (process.env.DB_DIALECT == 'sqlite') {
  const db = require('./database');
  db.authenticate();
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
    .then((res) => {
      const db = require('./database');
      createTables(db);
      createDb.close();
    })
    .catch((err) => {
      console.warn(err);
      createDb.close();
    });
}
