const path = require("path");
require('dotenv').config({path: '../.env'});

let port = `http://localhost:${process.env.PORT}`;
console.log(port);

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: port
      }
    }
  }
};
