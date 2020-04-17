const mariadb = require('mariadb');
const Sequelize = require('sequelize');

let pool;

const sequelize = new Sequelize('imageup', 'linelij', 'Password01', {
    host: "192.168.137.131",
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: 1,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const auth = {};

auth.Sequelize = Sequelize;
auth.sequelize = sequelize;

auth.user = require('./model/user.model.js')(sequelize, Sequelize);
auth.role = require('./model/role.model.js')(sequelize, Sequelize);

auth.role.belongsToMany(auth.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
auth.user.belongsToMany(auth.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

const ROLEs = ['USER', 'ADMIN', 'MOD'];
const secret = 'imageup-alwaysup';

function init() {

    // create database if not exists
    mariadb.createConnection({
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        })
        .then(conn => {
            conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})

            conn.end();
        })
        .catch(err => console.log(err));

    // create pool
    pool = mariadb.createPool({
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5
    });

    // setup database structure
    pool.getConnection()
        .then(conn => {
            conn.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(255),
                    username VARCHAR(32),
                    email VARCHAR(255),
                    password VARCHAR(255),
                    PRIMARY KEY (id)
                );
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})
            
            conn.query(`REPLACE INTO users (id, username) VALUES (1, "Anonymous");`)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})

            conn.query(`
                CREATE TABLE IF NOT EXISTS roles (
                    id INT UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(255),
                    PRIMARY KEY (id)
                );
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})

            conn.query(`
                CREATE TABLE IF NOT EXISTS user_roles (
                    roleId INT PRIMARY KEY,
                    userId INT 
                );
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end()})

            conn.query(`
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
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})
        })
        .catch(err => {
            console.error(err)
        });

        // pool.query(`INSERT INTO roles (name) VALUES(?), (?), (?);`, ["USER", "ADMIN", "MOD"])
        //     .then((res) => {pool.end()})
        //     .catch(err => {console.warn(err); pool.end()})
}

function getConn() {
    return pool.getConnection();
}

module.exports = {init, getConn, auth, ROLEs, secret};
