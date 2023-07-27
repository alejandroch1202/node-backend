const auth = require('../auth');
const TABLE = "post";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("./../../../store/mysql");
  }

  const list = async () => {
    return store.list(TABLE);
  };


  return {
    list,
  };
};
