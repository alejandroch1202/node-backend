const remote = require("./remote");
const config = require("./../config");

const host = config.mysqlService.host;
const port = config.mysqlService.port;

const instance = remote(host, port);

module.exports = instance;