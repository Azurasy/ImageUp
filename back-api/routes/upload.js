const express = require('express');
const router = express.Router();

// multer
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        //console.log(file);
        callback(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res) {
  let options = JSON.parse(req.body.options);
  console.log(`${options.name} - ${options.exposure} - ${options.expiration}`);
  
  console.log(req.file.originalname)
  res.status(204).end()
});

module.exports = router;