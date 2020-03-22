const fs = require('fs');
const config = require('./app.config.js');

// express
const express = require('express');
const app = express();

// cors
const cors = require('cors');
app.use(cors());

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mariadb
const db = require('./db.js');
db.init();

// routes
app.use('/upload', require('./routes/upload'));

// app
app.listen((process.env.port || config.port), err => {
    if (err) console.log(err);
    else console.log(`Listening on http://localhost:${config.port}`);
})