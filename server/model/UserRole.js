const Sequelize = require('sequelize');
const db = require('../database');

const UserRole = db.define('user_roles', {
	roleId: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
			allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	}
});

module.exports = UserRole;