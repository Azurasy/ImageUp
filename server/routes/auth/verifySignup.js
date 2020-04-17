const db = require('../../db.js');
const ROLEs = db.ROLEs; 
const User = db.auth.user;
const Role = db.auth.role;

checkDuplicateUserNameOrEmail = (req, res) => {
	// -> Check if Username is already in use
	User.findOne({
		where: {
			username: req.body.username,
			email: req.body.email
		} 
	}).then(user => {
		if (user){
			res.status(400).send("Error -> Username is already taken!");
			console.log(user.username);
			return;
		}
		
		// -> Check if Email is already in use
		// User.findOne({ 
		// 	where: {
		// 		email: req.body.email
		// 	} 
		// }).then(user => {
		// 	if (user){
		// 		res.status(400).send("Error -> Email is already in use!");
		// 		console.log(user.email);
		// 		return;
		// 	}
		// });
	});
}

checkRolesExisted = (req, res) => {	
	for(i = 0; i < req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send("Error -> Does NOT exist Role = " + req.body.roles[i]);
			return;
		}
	}
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;