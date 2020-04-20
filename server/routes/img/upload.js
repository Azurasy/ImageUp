const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const Image = require('../../model/Image');

// multer
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './local/uploads');
  },
  filename: function (request, file, callback) {
    file.uuid = shortid.generate();
    callback(null, file.uuid + path.extname(file.originalname));
  },
});
var upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  let options = JSON.parse(req.body.options);

  if (options.expiration != 0)
    options.expiration += Math.floor(new Date() / 1000);

  const file_ext = path.extname(req.file.originalname);
  const file_name = path.basename(req.file.originalname, file_ext);
  const userId = req.userId ? req.userId : 0;
  const base_url = '/img/'; // in preperation for using external storage like aws s3 bucket

  Image.create({
    userId,
    uuid: req.file.uuid,
    title: options.name,
    exposure: options.exposure,
    expiration: options.expiration,
    file_name,
    file_ext,
    base_url,
  })
    .then(() => {
      res.json({ uuid: req.file.uuid });
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
