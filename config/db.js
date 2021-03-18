// const config = require("./config");
// var mysql = require("mysql");
// const util = require("util");

// console.log({
//   host: config.database.host || "remotemysql.com",
//   user: config.database.user || "Ch8AIA96QJ",
//   password: config.database.password || "6qsdY8t213",
//   database: config.database.name || "Ch8AIA96QJ",
// });

// var connection = mysql.createConnection({
//   host: config.database.host || "remotemysql.com",
//   user: config.database.user || "Ch8AIA96QJ",
//   password: config.database.password || "6qsdY8t213",
//   database: config.database.name || "Ch8AIA96QJ",
// });

// connection.connect();

// connection.end();

// module.exports = connection;

const mysql = require("mysql");
const util = require("util");
const config = require("./config");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.database.host || "remotemysql.com",
  user: config.database.user || "Ch8AIA96QJ",
  password: config.database.password || "6qsdY8t213",
  database: config.database.name || "Ch8AIA96QJ",
  charset: "utf8mb4",
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
