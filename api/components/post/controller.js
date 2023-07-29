const auth = require("../auth");
const TABLE = "post";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("./../../../store/mysql");
  }

  const list = async () => {
    return store.list(TABLE);
  };

  const get = async (id) => {
    return store.get(TABLE, id);
  };

  const add = async (data) => {
    const userData = await store.add(TABLE, {
      text: data.text,
      user: data.user,
    });

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
