const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./database.js');

// init env vars
require('dotenv').config();
const isEnvProduction = ['production', 'prod', 'p'].includes(process.env.NODE_ENV);

// init db
require('./db_init');

// init express 
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve uploads folder
if (!fs.existsSync(process.env.UPLOAD_DIR)) fs.mkdirSync(process.env.UPLOAD_DIR);
app.use('/img', express.static(process.env.UPLOAD_DIR));

// routes
app.use('/api/img', require('./routes/img/router.js'))
app.use('/api/user', require('./routes/user.js'));

// serve SPA from public directory
if (isEnvProduction) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
}

const PORT = isEnvProduction ? process.env.PROD_PORT : process.env.DEV_PORT;

app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server started on http://localhost:${PORT}`);
});