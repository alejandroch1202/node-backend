const express = require('express')
const config = require('./../config')
const user = require('./network')

const app = express()

app.use(express.json())
app.use('/', user)

app.listen(
  config.cacheService.port,
  console.log(`[redis service] Running on http://localhost:${config.cacheService.port}`)
)
