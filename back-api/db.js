const mariadb = require('mariadb');

let pool;

function init() {
    pool = mariadb.createPool({
        host: 'onusai.com', 
        user:'admin', 
        password: '123123',
        database: 'imageup',
        connectionLimit: 5
    });
}

function getConn() {
    return pool.getConnection();
}

module.exports = {init, getConn};