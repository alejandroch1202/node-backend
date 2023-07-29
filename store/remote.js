const createRemoteDb = (host, port) => {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req('GET', table);
  };
  
  const get = (table, id) => {};
  const add = (table, data) => {};
  const update = (table, id, data) => {};
  const remove = (table, id) => {};
  const query = (table, query, join) => {};

  const req = async (method, table, data) => {
    try {
      let url = `${URL}/${table}`;

      const request = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await fetch(url, request);
      const response = result.json();
      return response;

    } catch (error) {
      console.error("[remote db]", error);
      throw new Error(error.message);
    }
  };

  return {
    list,
  }
};

module.exports = createRemoteDb;