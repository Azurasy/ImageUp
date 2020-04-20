const jwt = require('jsonwebtoken');
const db = require('../../database/db');

verifyToken = (req, res, next) => {
  req.userId = 0;

  let token = req.headers['x-access-token'];
  if (!token) return next();

  jwt.verify(token, db.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ reason: 'invalid token' });

    req.userId = decoded.id;
    return next();
  });
};

requireToken = (req, res, next) => {
  if (req.userId) return next();
  res.status(401).json({ reason: 'invalid token' });
};

module.exports = {
  verifyToken,
  requireToken,
};
