const express = require('express');
const router = express.Router();
const db = require('../db.js');
const shortid = require('shortid');
const path = require('path');
const cors = require('cors');

router.get('/:id', function (req, res) {
  
    db.getConn()
        .then(conn => {
            conn.query(`SELECT * FROM images WHERE uuid = ?;`, [req.params.id])
                .then((rows) => {
                    if (rows.length > 0) {
                        res.json({data: rows[0]});
                        console.log(rows[0]);
                    }
                    else res.json({data: null});
                })
                .then((res) => { conn.end(); })
                .catch(err => { console.warn(err); conn.end(); })
        })
        .catch(err => console.warn(err));

});

module.exports = router;