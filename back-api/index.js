const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const config = JSON.parse(fs.readFileSync('./appconfig.json'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res) => {
    console.log(req.body);
});

app.listen((process.env.port || config.port), err => {
    if (err) console.log(err);
    else console.log(`Listening on http://localhost:${config.port}`);
})