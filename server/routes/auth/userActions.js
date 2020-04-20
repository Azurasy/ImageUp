const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const db = require('../../database/db');

signup = (name, username, email, password, cb) => {
  // cb(err, user)

  User.create({
    name,
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user) => {
      return cb(null, user.dataValues.id);
    })
    .catch((err) => {
      console.warn(err);
      return cb({ code: 500, reason: 'server error' });
    });
};

login = (username, password, cb) => {
  // cb(err, token)

  //const expiresIn = 86400; // expires in 24 hours
  const expiresIn = 10;

  User.findOne({
    where: { username },
  })
    .then((user) => {
      if (!user) return cb({ code: 400, reason: 'user not found' });

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid)
        return cb({ code: 400, reason: 'incorrect password' });

      let token = jwt.sign({ id: user.id }, db.SECRET, { expiresIn });

      return cb(null, token, expiresIn);
    })
    .catch((err) => {
      console.warn(err);
      return cb({ code: 500, reason: 'server error' });
    });
};

userDataByUsername = (username, cb) => {
  // cb(err, userData)

  User.findOne({
    where: { username },
    attributes: ['id', 'name', 'username', 'email'],
  })
    .then((user) => {
      if (user) return cb(null, user.dataValues);
      return cb({ code: 404, reason: 'user not found' });
    })
    .catch((err) => {
      console.warn(err);
      return cb({ code: 500, reason: 'server error' });
    });
};

userDataById = (id, cb) => {
  // cb(err, userData)

  User.findOne({
    where: { id },
    attributes: ['id', 'name', 'username', 'email'],
  })
    .then((user) => {
      if (user) return cb(null, user.dataValues);
      return cb({ code: 404, reason: 'user not found' });
    })
    .catch((err) => {
      console.warn(err);
      return cb({ code: 500, reason: 'server error' });
    });
};

usernameAvailable = (username, cb) => {
  // cb(err, available)

  User.findOne({
    where: { username },
  })
    .then((user) => {
      if (user) return cb(null, false);
      return cb(null, true);
    })
    .catch((err) => {
      console.warn(err);
      return cb({ code: 500, reason: 'server error' });
    });
};

module.exports = {
  signup,
  login,
  userDataByUsername,
  userDataById,
  usernameAvailable,
};
