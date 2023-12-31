const express = require('express')
const security = require('./security')
const response = require('./../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await controller.list()
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await controller.get(id)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const result = await controller.add(data)
    response.success(req, res, result, 201)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', security('update'), async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await controller.update(id, data)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await controller.remove(id)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.post('/follow/:id', security('follow'), async (req, res, next) => {
  try {
    const from = req.user.id
    const to = req.params.id
    const result = await controller.follow(from, to)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/follow', async (req, res, next) => {
  try {
    const user = req.params.id
    const result = await controller.following(user)
    response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
