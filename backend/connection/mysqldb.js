const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "dzaky",
  password: "pangya20",
  database: "backendproject",
  port: "3306"
});

module.exports = db;