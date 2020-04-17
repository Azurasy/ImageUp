const verifySignup = require('./auth/verifySignup');
const authJwt = require('./auth/verifyJwtToken');
const controller = require('../controller/controller.js');
const express = require('express');
const router = express.Router();
const db = require('../db.js');
const session = require('express-session');

router.post('/auth/signup', function(req, res) {
    verifySignup.checkDuplicateUserNameOrEmail(req, res);
    verifySignup.checkRolesExisted(req, res);
    controller.signup(req, res);
});

router.post('/auth/signin', function(req, res) {
    controller.signin(req, res);
});

router.get('/user', function(req, res) {
    authJwt.verifyToken(req, res);
    controller.userContent(req, res);
})

module.exports = router;