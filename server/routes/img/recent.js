const express = require('express');
const router = express.Router();
const Image = require('../../model/Image');
const Op = require('sequelize').Op;

router.get('/:index', function (req, res) {
  Image.findAll({
    where: {
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
