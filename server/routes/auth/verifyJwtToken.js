const jwt = require('jsonwebtoken');
const db = require('../../db.js');
const User = require('../../model/User');
const { SECRET } = require('../../consts');

verifyToken = (req, cb) => {
  // cb(err)

  let token = req.headers['x-access-token'];
  if (!token) return cb('missing token');

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return cb('failed decoding token');
    req.userId = decoded.id;
    return cb(false);
  });
};

module.exports = {
  verifyToken,
};
