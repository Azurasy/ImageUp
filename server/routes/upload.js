const express = require('express');
const router = express.Router();
const db = require('../db.js');
const shortid = require('shortid');
const path = require('path');

// multer
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, process.env.UPLOAD_DIR);
    },
    filename: function (request, file, callback) {
        file.uuid = shortid.generate();
        callback(null, file.uuid + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res) {
    let options = JSON.parse(req.body.options);
    console.log(`${options.name} - ${options.exposure} - ${options.expiration} - ${req.file.originalname}`);

    if (options.expiration == -1) options.expiration = 0;
    else options.expiration += Math.floor(new Date() / 1000);

    const f_ext = path.extname(req.file.originalname);
    const f_name = path.basename(req.file.originalname, f_ext);

    db.getConn()
        .then(conn => {
            conn.query("INSERT INTO images (user, uuid, title, exposure, expiration, file_name, file_ext) VALUES (?, ?, ?, ?, ?, ?, ?);",
                    [1, req.file.uuid, options.name, options.exposure, options.expiration, f_name, f_ext])
                .then((res) => { console.log(res); conn.end(); })
                .catch(err => { console.warn(err); conn.end(); })
        })
        .catch(err => console.warn(err));
    
    res.json({uuid: req.file.uuid});
    
});

module.exports = router;