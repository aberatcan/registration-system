const mysql = require("mysql2");
const Config = require("../config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: Config.dbConfig.host,
  user: Config.dbConfig.user,
  password: Config.dbConfig.password,
  database: Config.dbConfig.database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;