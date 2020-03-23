const mariadb = require('mariadb');

let pool;

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
                    username VARCHAR(32),
                    email VARCHAR(255),
                    password BLOB,
                    PRIMARY KEY (id)
                );
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})
            
            conn.query(`REPLACE INTO users (id, username) VALUES (1, "Anonymous");`)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})

            conn.query(`
                CREATE TABLE IF NOT EXISTS images (
                    id INT UNSIGNED AUTO_INCREMENT,
                    user INT UNSIGNED,
                    uuid VARCHAR(14),
                    title VARCHAR(100),
                    exposure VARCHAR(8),
                    expiration INT UNSIGNED,
                    file_name VARCHAR(124),
                    file_ext VARCHAR(16),
                    PRIMARY KEY (id)
                );
                `)
                .then((res) => {conn.end()})
                .catch(err => {console.warn(err); conn.end();})
        })
        .catch(err => {
            console.error(err)
        });
}

function getConn() {
    return pool.getConnection();
}

module.exports = {init, getConn};
