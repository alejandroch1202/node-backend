const bcrypt = require("bcrypt");
const auth = require("./../../../auth");
const error = require("./../../../utils/error");

const TABLE = "auth";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("./../../../store/mysql");
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });
    const result = await bcrypt.compare(password, data.password);
    if (result) {
      return auth.sign(data);
    } else {
      throw error("Invalid username or password", 401);
    }
  };

  const logout = async () => {};

  const add = async (data) => {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }
    return store.add(TABLE, authData);
  };

  const update = async (id, data) => {
    return store.update(TABLE, id, data);
  };

  const remove = async (id) => {
    return store.remove(TABLE, id);
  };

  return {
    login,
    logout,
    add,
    update,
    remove,
  };
};
