const express = require('express');
const router = express.Router();
const db = require('../db.js');
const shortid = require('shortid');
const path = require('path');
const cors = require('cors');

router.get('/:index', function (req, res) {

    db.getConn()
        .then(conn => {

          if (req.params.index == -1) {
            conn.query(`SELECT *
                        FROM images
                        WHERE exposure = 'public'
                        AND (expiration = 0 OR expiration > ?)
                        ORDER BY id DESC
                        LIMIT 50
                        ;`, [Math.floor(new Date() / 1000)])
                .then((rows) => {
                    if (rows.length > 0) {
                        res.json({data: rows});
                        //console.log(rows.length);
                    }
                    else res.json({data: null});
                })
                .then((res) => { conn.end(); })
                .catch(err => { console.warn(err); conn.end(); })
          }
          else {

          }
        })
        .catch(err => console.warn(err));

});

module.exports = router;