const mariadb = require('mariadb');
const config = require('./app.config.js');

let pool;

function init() {
    pool = mariadb.createPool({
        host: config.db_host, 
        user: config.db_user, 
        password: config.db_password,
        database: config.db_database,
        connectionLimit: 5
    });

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
                    title VARCHAR(100),
                    exposure VARCHAR(8),
                    expiration INT UNSIGNED,
                    filename VARCHAR(100),
                    uuid VARCHAR(8),
                    PRIMARY KEY (id),
                    FOREIGN KEY (user) REFERENCES users(id)
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