const express = require('express');
const router = express.Router();
const db = require('../../db.js');
const shortid = require('shortid');
const path = require('path');
const Image = require('../../model/Image');

// multer
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, process.env.UPLOAD_DIR);
  },
  filename: function (request, file, callback) {
    file.uuid = shortid.generate();
    callback(null, file.uuid + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res) {
  let options = JSON.parse(req.body.options);
  if (options.expiration != 0)
    options.expiration += Math.floor(new Date() / 1000);
  const f_ext = path.extname(req.file.originalname);
  const f_name = path.basename(req.file.originalname, f_ext);
  const base_url = '/img/'; // in preperation for using external storage like aws s3 bucket

  Image.create({
    user: 1,
    uuid: req.file.uuid,
    title: options.name,
    exposure: options.exposure,
    expiration: options.expiration,
    file_name: f_name,
    file_ext: f_ext,
    base_url: base_url,
  })
    .then(() => {
      res.json({ uuid: req.file.uuid });
    })
    .catch((err) => console.warn(err));
});

module.exports = router;
