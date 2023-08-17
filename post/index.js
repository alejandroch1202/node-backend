const express = require('express')
const config = require('./../config')
const post = require('./post/network')
const errors = require('./../network/errors')

const app = express()

app.use(express.json())
app.use('/api/post', post)
app.use(errors)

app.listen(
  config.post.port,
  console.log(`[post service] Running on http://localhost:${config.post.port}`)
)
