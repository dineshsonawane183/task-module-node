const { createPool } = require("mysql");

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 15
});

module.exports = pool;