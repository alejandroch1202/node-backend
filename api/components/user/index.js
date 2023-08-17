// const store = require("./../../../store/dummy");
// const store = require("./../../../store/postgres");
// const store = require("./../../../store/mysql");
const store = require('./../../../store/mysql')
const redis = require('./../../../store/redis')
const controller = require('./controller')

module.exports = controller(store, redis)
