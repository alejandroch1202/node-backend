const auth = require('../auth')
const TABLE = 'user'

module.exports = (injectedStore, injectedCache) => {
  let store = injectedStore
  let cache = injectedCache
  if (!store) {
    store = require('./../../../store/dummy')
  }
  if (!cache) {
    cache = require('./../../../store/dummy')
  }

  const list = async () => {
    let users = await cache.list(TABLE)
    if (!users) {
      console.log('Was not in cache, fetching DB instead')
      users = await store.list(TABLE)
      await cache.add(TABLE, users)
    } else {
      console.log('Found in cache')
    }
    return users
  }

  const get = async (id) => {
    return store.get(TABLE, id)
  }

  const add = async (data) => {
    const userData = await store.add(TABLE, {
      name: data.name,
      username: data.username
    })

    if (data.username || data.password) {
      await auth.add({
        id: userData.id,
        username: data.username,
        password: data.password
      })
    }

    return userData
  }

  const update = async (id, data) => {
    const newData = {}
    if (data.username || data.password) {
      if (data.username) {
        newData.username = data.username
      }
      if (data.password) {
        newData.password = data.password
      }
      await auth.update(id, newData)
    }

    return store.update(TABLE, id, data)
  }

  const remove = async (id) => {
    await auth.remove(id)
    return store.remove(TABLE, id)
  }

  const follow = async (from, to) => {
    return await store.follow(TABLE + '_follow', {
      user_from: from,
      user_to: to
    })
  }

  const following = async (user) => {
    const join = {}
    join[TABLE] = 'user_to'
    const query = { user_from: user }
    return await store.query(TABLE + '_follow', query, join)
  }

  return {
    list,
    get,
    add,
    update,
    remove,
    follow,
    following
  }
}
