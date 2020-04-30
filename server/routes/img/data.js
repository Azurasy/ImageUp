const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const User = require('../../models/User');

router.get('/:id', function (req, res) {
  Image.findOne({
    where: { uuid: req.params.id },
  }).then((image) => {
    if (image) {
      let img_data = image.dataValues;

      if (img_data.exposure == 'private' && req.userId != img_data.userId)
        return res.json({ data: null, reason: 'This image is private' });

      User.findOne({
        where: { id: img_data.userId },
      })
        .then((user) => {
          if (user) img_data.username = user.dataValues.username;
        })
        .finally(() => {
          return res.json({ data: img_data });
        });
    } else return res.json({ data: null, reason: 'Image not found' });
  });
});

module.exports = router;
