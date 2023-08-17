module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('./../../../store/dummy')
  }

  const all = async () => {
    return store.all()
  }

  return {
    all
  }
}
