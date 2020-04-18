const { usernameAvailable } = require('./auth/verifySignup');
const authJwt = require('./auth/verifyJwtToken');
const controller = require('../controller/controller.js');
const express = require('express');
const router = express.Router();

router.post('/auth/signup', (req, res) => {
    const data = req.body;

    usernameAvailable(data.username, err => {
        if (err) return res.status(200).json({error: err});

        controller.signup(
            data.name,
            data.username,
            data.email,
            data.password,
            (err, id) => {
                if (err) return res.json({error: err});
                console.log(`user created: ${data.username}`);
                res.json({id});
            });
    })
});

router.post('/auth/login', (req, res) => {
    controller.login(req.body.username, req.body.password,
        (err, token, expires) => {
            if (err) return res.json({error: err});
            res.json({token, expires});
    });
});

router.get('/data/:username', (req, res) => {
    authJwt.verifyToken(req, token_err => {
        controller.userDataByUsername(req.params.username, (err, data) => {
            if (err) return res.json({error: err});
            
            if (req.userId != data.id || token_err)
                res.json({id: data.id, name: data.name, username: data.username});
            else
                res.json(data);
        });
    });
})

router.get('/tokendata', (req, res) => {
    authJwt.verifyToken(req, err => {
        if (err) return res.status(401).end();

        controller.userDataById(req.userId, (err, data) => {
            if (err) return res.json({error: err});
            res.json(data);
        });
    });
    
})


module.exports = router;