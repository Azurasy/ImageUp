const express = require('express');
const router = express.Router();
const db = require('../../db.js');
const Image = require('../../model/Image');

router.get('/:id', function (req, res) {
  
    Image.findOne({
        where: { uuid: req.params.id }
    })
    .then(image => {
        if (image) return res.json({data: image.dataValues})
        res.json({data: null});
    });

});

module.exports = router;