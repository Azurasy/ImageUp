const path = require("path");
require("dotenv").config({ path: "../.env" });

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api/*": {
        target: `http://localhost:${process.env.PORT}`
      },
      "/img/*": {
        target: `http://localhost:${process.env.PORT}`
      }
    }
  }
};
