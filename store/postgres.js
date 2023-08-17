const uuid = require('uuid')
const postgres = require('pg')
const config = require('./../config')

const dbConf = {
  host: config.postgres.host,
  user: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  port: config.postgres.port,
  ssl: true,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 60000
}

let connection

const handleConection = async () => {
  try {
    connection = new postgres.Pool(dbConf)
    await connection.connect(() => {
      console.log('[db] Connection established')
    })
  } catch (error) {
    console.log('[testing]', error)
  }
}

handleConection()

const list = async (table) => {
  try {
    const query = `SELECT * FROM public.${table}`
    const data = await connection.query(query)
    return data.rows
  } catch (error) {
    throw new Error(error)
  }
}

const get = async (table, id) => {
  try {
    const query = `SELECT * FROM public.${table} WHERE id='${id}' LIMIT 1`
    const data = await connection.query(query)
    return data.rows
  } catch (error) {
    throw new Error(error)
  }
}

const add = async (table, data) => {
  try {
    const id = uuid.v4()
    const newUser = { id, ...data }
    const query = `INSERT INTO public.${table} SET ?`
    await connection.query(query, newUser)
    return { id }
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (table, id, data) => {
  try {
    const query = `UPDATE public.${table} SET ? WHERE id='${id}'`
    const result = await connection.query(query, data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async (table, id) => {
  try {
    const query = `DELETE FROM public.${table} WHERE id='${id}'`
    const result = await connection.query(query)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const query = async (table, q, join) => {
  try {
    let joinQuery = ''

    if (join) {
      const key = Object.keys(join)[0]
      const value = join[key]
      joinQuery = `JOIN ${key} ON public.${table}.${value} = ${key}.id`
    }

    const query = `SELECT * FROM public.${table} ${joinQuery} WHERE public.${table}.?`
    const data = await connection.query(query, q)
    return data[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const follow = async (table, data) => {
  try {
    const query = `INSERT INTO public.${table} SET ?`
    const result = await connection.query(query, data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const following = async (table, user) => {
  try {
    const query = `SELECT * FROM public.${table} WHERE user_from='${user}'`
    const result = await connection.query(query)
    return result[0]
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  list,
  get,
  add,
  update,
  remove,
  query,
  follow,
  following
}
