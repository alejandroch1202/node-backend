const uuid = require("uuid");
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
    const query = `SELECT * FROM ${table}`;
    const data = await connection.query(query);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};

const get = async (table, id) => {
  try {
    const query = `SELECT * FROM ${table} WHERE id="${id}" LIMIT 1`;
    const data = await connection.query(query);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};

const add = async (table, data) => {
  try {
    const id = uuid.v4();
    const newUser = { id, ...data };
    const query = `INSERT INTO ${table} SET ?`;
    await connection.query(query, newUser);
    return {id};
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (table, id, data) => {
  try {
    const query = `UPDATE ${table} SET ? WHERE id="${id}"`;
    const result = await connection.query(query, data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const remove = async (table, id) => {
  try {
    const query = `DELETE FROM ${table} WHERE id="${id}"`;
    const result = await connection.query(query);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const query = async (table, q, join) => {
  try {
    let joinQuery = "";

    if (join) {
      const key = Object.keys(join)[0];
      const value = join[key];
      joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`
    }

    const query = `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`;
    const data = await connection.query(query, q);
    return data[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

const follow = async (table, data) => {
  try {
    const query = `INSERT INTO ${table} SET ?`;
    const result = await connection.query(query, data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const following = async (table, user) => {
  try {
    const query = `SELECT * FROM ${table} WHERE user_from="${user}"`;
    const result = await connection.query(query);
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  list,
  get,
  add,
  update,
  remove,
  query,
  follow,
  following,
};
