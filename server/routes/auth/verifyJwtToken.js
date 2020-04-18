const jwt = require('jsonwebtoken');
const db = require('../../database/db');

verifyToken = (req, cb) => {
  // cb(err)

  let token = req.headers['x-access-token'];
  if (!token) return cb('missing token');

  jwt.verify(token, db.SECRET, (err, decoded) => {
    if (err) return cb('failed decoding token');
    req.userId = decoded.id;
    return cb(false);
  });
};

module.exports = {
  verifyToken,
};
