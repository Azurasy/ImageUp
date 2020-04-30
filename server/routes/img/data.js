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

      User.findOne({
        where: { id: img_data.userId },
      })
        .then((user) => {
          if (user) img_data.username = user.dataValues.username;
        })
        .finally(() => {
          return res.json({ data: img_data });
        });
    } else res.json({ data: null });
  });
});

module.exports = router;
