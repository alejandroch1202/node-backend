const express = require('express')
const response = require('./../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const result = await controller.login(username, password)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
