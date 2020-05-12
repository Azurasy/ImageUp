const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');

router.get('/', function (req, res) {
    Image.findAll({
        where: { title: req.body.title },
    }).then((images) => {
        let data = [];
        images.forEach((image) => data.push(image.dataValues));
        res.json({ data });
    }).catch((err) => {
        console.warn(err);
        console.log(req.body.title);
    });
});

module.exports = router;