const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

require('dotenv').config();

db.init();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve uploads folder
if (!fs.existsSync(process.env.UPLOAD_DIR)) fs.mkdirSync(process.env.UPLOAD_DIR);
app.use('/i', express.static(process.env.UPLOAD_DIR));

// routes
app.use('/api/upload', require('./routes/upload'));

// serve SPA from public directory
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
}

app.listen(process.env.PORT, err => {
    if (err) console.log(err);
    else console.log(`Server started on http://localhost:${process.env.PORT}`);
});