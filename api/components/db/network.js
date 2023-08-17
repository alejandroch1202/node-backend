const express = require('express')
const response = require('./../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await controller.all()
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, 'Internal error', 500, error)
  }
})

module.exports = router
