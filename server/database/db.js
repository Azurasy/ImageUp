const Sequelize = require('sequelize');
require('dotenv').config();

if (process.env.DB_DIALECT == 'sqlite') {
  // sqlite
  module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: './local/database.sqlite',
    operatorAliases: false,
    define: { timestamps: false },
    logging: false,
  });
} else {
  /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      operatorAliases: false,
      define: { timestamps: false },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    }
  );
}
