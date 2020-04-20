const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('./routes/auth/verifyJwtToken');

// create local directory
if (!fs.existsSync('./local')) fs.mkdirSync('./local');

// init env vars
require('dotenv').config();
const isEnvProduction = ['production', 'prod', 'p'].includes(
  process.env.NODE_ENV
);

// init db
require('./database/db_init');

// init express
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyToken);

// serve uploads folder
if (!fs.existsSync('./local/uploads')) fs.mkdirSync('./local/uploads');
app.use('/img', express.static('./local/uploads'));

// routes
app.use('/api/img', require('./routes/img/router.js'));
app.use('/api/user', require('./routes/auth/user.js'));

// serve SPA from public directory
if (isEnvProduction) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get(/.*/, (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  );
}

const PORT = isEnvProduction ? process.env.PROD_PORT : process.env.DEV_PORT;

app.listen(PORT, (err) => {
  if (err) console.warn(err);
  else console.log(`\nServer started on http://localhost:${PORT}`);
});
