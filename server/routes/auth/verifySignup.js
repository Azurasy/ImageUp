const User = require('../../model/User');

usernameAvailable = (username, cb) => {
  User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user) cb('Username is already taken');
    else cb(false);
  });
};

module.exports = {
  usernameAvailable,
};
