const mariadb = require('mariadb');
const Sequelize = require('sequelize');

let pool, auth, ROLEs, secret, sequelize;

function init() {
  // create database if not exists
  mariadb
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })
    .then((conn) => {
      conn
        .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
        .then((res) => conn.end())
        .catch((err) => {
          console.warn(err);
          conn.end();
        });
    })
    .catch((err) => console.warn(err));

  // create pool
  pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
  });

  // setup database structure
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          `
                CREATE TABLE IF NOT EXISTS users (
                    id INT UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(32),
                    username VARCHAR(32),
                    email VARCHAR(32),
                    password VARCHAR(255),
                    PRIMARY KEY (id)
                );
                `
        )
        .then((res) => {})
        .catch((err) => {
          console.warn(err);
          conn.end();
        });

      conn
        .query(
          `
                CREATE TABLE IF NOT EXISTS roles (
                    id INT UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(255),
                    PRIMARY KEY (id)
                );
                `
        )
        .then((res) => {})
        .catch((err) => {
          console.warn(err);
          conn.end();
        });

      conn
        .query(
          `
                CREATE TABLE IF NOT EXISTS user_roles (
                    roleId INT PRIMARY KEY,
                    userId INT 
                );
                `
        )
        .then((res) => {})
        .catch((err) => {
          console.warn(err);
          conn.end();
        });

      conn
        .query(
          `
                CREATE TABLE IF NOT EXISTS images (
                    id INT UNSIGNED AUTO_INCREMENT,
                    user INT UNSIGNED,
                    uuid VARCHAR(14),
                    title VARCHAR(128),
                    exposure VARCHAR(8),
                    expiration INT UNSIGNED,
                    file_name VARCHAR(128),
                    file_ext VARCHAR(16),
                    base_url VARCHAR(128),
                    PRIMARY KEY (id)
                );
                `
        )
        .then((res) => {})
        .catch((err) => {
          console.warn(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.warn(err);
    });

  // pool.query(`INSERT INTO roles (name) VALUES(?), (?), (?);`, ["USER", "ADMIN", "MOD"])
  //     .then((res) => {pool.end()})
  //     .catch(err => {console.warn(err); pool.end()})

  console.log(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_HOST
  );

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mariadb',
      operatorAliases: false,
      define: { timestamps: false },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

  auth = {
    Sequelize,
    sequelize,
    user: require('./model/User.js')(sequelize, Sequelize),
    role: require('./model/Role.js')(sequelize, Sequelize),
  };

  auth.role.belongsToMany(auth.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId',
  });
  auth.user.belongsToMany(auth.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
  });

  ROLEs = ['USER', 'ADMIN', 'MOD'];
  secret = 'imageup-alwaysup';
}

function getConn() {
  return pool.getConnection();
}

module.exports = { init, getConn, auth, ROLEs, secret };
