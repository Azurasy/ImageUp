const { requireToken } = require('./verifyJwtToken');
const controller = require('./userActions.js');
const express = require('express');
const router = express.Router();

router.post('/auth/signup', (req, res) => {
  controller.usernameAvailable(req.body.username, (err, available) => {
    if (err) return res.status(err.code).json(err);
    if (!available) return res.status(400).json({ reason: 'username taken' });

    controller.signup(
      req.body.name,
      req.body.username,
      req.body.email,
      req.body.password,

      (err, id) => {
        if (err) return res.status(err.code).json(err);
        res.json({ id });
      }
    );
  });
});

router.post('/auth/login', (req, res) => {
  controller.login(
    req.body.username,
    req.body.password,

    (err, token, expires) => {
      if (err) return res.status(err.code).json(err);
      res.json({ token, expires });
    }
  );
});

router.get('/data/:username', (req, res) => {
  controller.userDataByUsername(req.params.username, (err, data) => {
    if (err) return res.status(err.code).json(err);

    if (req.userId != data.id)
      return res.json({
        id: data.id,
        name: data.name,
        username: data.username,
      });
    res.json(data);
  });
});

router.get('/data', requireToken, (req, res) => {
  controller.userDataById(req.userId, (err, data) => {
    if (err) return res.status(err.code).json(err);
    res.json(data);
  });
});

module.exports = router;
