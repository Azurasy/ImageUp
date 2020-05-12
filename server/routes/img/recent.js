const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const { Op } = require('sequelize');

router.get('/:userId/:index', function (req, res) {
  const op = req.params.userId == 0 ? Op.gte : Op.eq;
  Image.findAll({
    where: {
      userId: {
        [op]: req.params.userId,
      },
      exposure: 'public',
      expiration: {
        [Op.or]: {
          [Op.eq]: 0,
          [Op.gt]: Math.floor(new Date() / 1000),
        },
      },
    },
    order: [['id', 'DESC']],
    limit: 50,
  })
    .then((images) => {
      let data = [];
      images.forEach((image) => data.push(image.dataValues));
      res.json({ data });
    })
    .catch((err) => console.warn(err));
});

module.exports = router;