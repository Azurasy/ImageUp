const express = require('express');
const router = express.Router();
const Image = require('../../models/Image');
const { Op } = require('sequelize');

router.get('/:userId/:index', function (req, res) {
  const op = req.params.userId == 0 ? Op.gte : Op.eq;

  const where = {
    userId: {
      [op]: req.params.userId,
    },
    expiration: {
      [Op.or]: {
        [Op.eq]: 0,
        [Op.gt]: Math.floor(new Date() / 1000),
      },
    },
  };

  if (!req.userId || req.userId != req.params.userId) where.exposure = 'public';

  Image.findAll({
    where,
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
