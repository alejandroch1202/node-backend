const auth = require('../auth');
const TABLE = "user";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("./../../../store/dummy");
  }

  const list = async () => {
    return store.list(TABLE);
  };

  const get = async (id) => {
    return store.get(TABLE, id);
  };

  const add = async (data) => {
    const userData = await store.add(TABLE, {
      name: data.name,
      username: data.username,
    });

    if (data.username || data.password) {
      await auth.add({
        id: userData.id,
        username: data.username,
        password: data.password,
      });
    }

    return userData;
  };

  const update = async (id, data) => {
    let newData = {};
    if (data.username || data.password) {
      if (data.username) {
        newData.username = data.username;
      }
      if (data.password) {
        newData.password = data.password;
      }
      await auth.update(id, newData);
    }

    return store.update(TABLE, id, data);
  };

  const remove = async (id) => {
    await auth.remove(id);
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    add,
    update,
    remove,
  };
};
