const jwt = require('jsonwebtoken');
const db = require('../../db.js');
const Role = db.auth.role;
const User = db.auth.user;

verifyToken = (req, res) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            auth: false, message: 'No token provided'
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failure to Authenticate. Error --> ' + err
            });
        }
        req.userId = decoded.id;
    });
}

isAdmin = (req, res) => {
    let token = req.headers['x-access-token'];

    User.findById(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for(i = 0; i < roles.length; i++){
                    console.log(roles[i].name);
                    if (roles[i].name.toUpperCase() === "ADMIN"){
                        return;
                    }
                }
                res.status(403).send('Requires Admin Role.');
                return;
            })
        })
}

isModOrAdmin = (req, res) => {
    let token = req.headers['x-access-token'];

    User.findById(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (i = 0; i < roles.length; i++){
                    if (roles[i].name.toUpperCase() === "MOD"){
                        return;
                    }

                    if (roles[i].name.toUpperCase() === "ADMIN"){
                        next();
                        return;
                    }
                }
                res.status(403).send('Requires MOD or ADMIN.');
            })
        })
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isModOrAdmin = isModOrAdmin;

module.exports = authJwt;