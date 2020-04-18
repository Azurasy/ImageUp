const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User')
const { SECRET } = require('../consts');

signup = (name, username, email, password, cb) => {
	// cb(err, user)

	User.create({
		name,
		username,
		email,
		password: bcrypt.hashSync(password, 8)
	})
	.then(user => {
		cb(null, user.dataValues.id);
	})
	.catch(err => {
		console.warn(err);
		cb("failed: server error", null)
	});
}

login = (username, password, cb) => {
	// cb(err, token)

	const expiresIn = 86400; // expires in 24 hours

	User.findOne({
		where: { username }
	})
	.then(user => {
		if (!user) return cb("User not found");

		const passwordValid = bcrypt.compareSync(password, user.password);
		if (!passwordValid) return cb("Incorrect password");
		
		let token = jwt.sign({ id: user.id }, SECRET, { expiresIn });
		
		cb(false, token, expiresIn);
	})
	.catch(err => {
		console.warn(err);
		cb("failed: server error")
	});
}

userDataByUsername = (username, cb) => {
	User.findOne({
		where: { username },
		attributes: ['id', 'name', 'username', 'email']
	})
	.then(user => {
		if (user) return cb(false, user.dataValues);
		return cb("User not found");
	})
	.catch(err => { 
		console.warn(err)
		cb("Server error");
	});
}

userDataById = (id, cb) => {
	User.findOne({
		where: { id },
		attributes: ['id', 'name', 'username', 'email']
	})
	.then(user => {
		if (user) return cb(false, user.dataValues);
		return cb("User not found");
	})
	.catch(err => { 
		console.warn(err)
		cb("Server error");
	});
}

module.exports = {
	signup,
	login,
	userDataByUsername,
	userDataById
}