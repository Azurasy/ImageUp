const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./appconfig.json'));

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        //console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), function (req, res) {
    let options = JSON.parse(req.body.options);
    console.log(`${options.name} - ${options.exposure} - ${options.expiration}`);
    
    console.log(req.file.originalname)
    res.status(204).end()
});

app.listen((process.env.port || config.port), err => {
    if (err) console.log(err);
    else console.log(`Listening on http://localhost:${config.port}`);
})