const redis = require('redis')
const config = require('./../config')

const redisConfig = {
  url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
}

const client = redis.createClient(redisConfig)

;(async () => {
  client.on('error', err => console.log('[redis db]', err.message))
  await client.connect()
  console.log('[redis db] Connection established')
})()

const list = async (table) => {
  try {
    const data = await client.get(table)
    let response = data || null
    if (data) {
      response = JSON.parse(data)
    }
    return response
  } catch (error) {
    throw new Error(error)
  }
}

const get = async (table, id) => {
  try {
    const data = await client.get(`${table}_${id}`)
    let response = data || null
    if (data) {
      response = JSON.stringify(data)
    }
    return response
  } catch (error) {
    throw new Error(error)
  }
}

const add = async (table, data) => {
  try {
    if (data) {
      await client.set(table, JSON.stringify(data), { EX: 15 })
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const update = async (table, id, data) => {
  try {
    if (data) {
      await client.set(`${table}_${id}`, JSON.stringify(data), { EX: 15 })
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  list,
  get,
  add,
  update
}
