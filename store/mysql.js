const mysql = require("mysql2/promise");
const config = require("./../config");

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

let connection;

const handleConection = async () => {
  try {
    connection = await mysql.createConnection(dbConf);
    console.log("[db] Connection established");

  } catch (error) {
    throw error;
  }
};

handleConection();

const list = async (table) => {
  try {
    const query = `SELECT * FROM ${table} LIMIT 1`;
    const data = await connection.execute(query);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  list,
};
