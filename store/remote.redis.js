const remote = require('./remote')
const config = require('./../config')

const host = config.cacheService.host
const port = config.cacheService.port

const instance = remote(host, port)

module.exports = instance
