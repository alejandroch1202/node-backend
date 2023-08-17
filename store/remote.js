const createRemoteDb = (host, port) => {
  const URL = `http://${host}:${port}`

  const list = async (table) => {
    const data = await req('GET', table)
    return data.body
  }

  const get = async (table, id) => {
    const data = await req('GET', table, { id })
    if (data.body === undefined || data.body.length === 0) {
      return 'User not found'
    }
    return data.body
  }

  const add = async (table, data) => {}
  const update = async (table, id, data) => {}
  const remove = async (table, id) => {}
  const query = async (table, query, join) => {}

  const req = async (method, table, data) => {
    try {
      let url = `${URL}/${table}`

      if (data && data.id) {
        url += `/${data.id}`
      }

      const request = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const result = await fetch(url, request)
      const response = result.json()
      return response
    } catch (error) {
      console.error('[remote db]', error)
      throw new Error(error.message)
    }
  }

  return {
    list,
    get,
    add,
    update,
    remove,
    query
  }
}

module.exports = createRemoteDb
