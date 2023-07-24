const uuid = require("uuid");

const db = {
  auth: [
    {
      id: "8ff7a37d-25d2-4d6c-b0e4-39852eecca0e",
      username: "alejandroch",
      password: "$2b$10$Ll7TIJo.8VuF26.uVFmQxOyQw2K/H8ERm/tQdNoVdaQKrimQzQ3D6",
    },
    {
      id: "7aa7a37d-25d2-4d6c-b0e4-39852eecca1f",
      username: "andresa",
      password: "$2b$10$8E1b.Q7L9fcSRSmLHfjVq.ZsKZmJRP.NqamYEci.76gEFWBFhAJNS",
    },
  ],
  user: [
    {
      id: "8ff7a37d-25d2-4d6c-b0e4-39852eecca0e",
      username: "alejandroch",
      name: "Alejandro Chavez",
    },
    {
      id: "7aa7a37d-25d2-4d6c-b0e4-39852eecca1f",
      username: "andresa",
      name: "Andres Alvarez",
    },
  ],
  post: [],
};

const all = async (req, res) => {
  return db;
};

const list = async (table) => {
  return db[table];
};

const get = async (table, id) => {
  const user = db[table].find((data) => data.id === id) || null;
  if (!user) {
    return "User not found";
  }
  return user;
};

const add = async (table, data) => {
  const id = uuid.v4();
  db[table].push({ id, ...data });
  return db[table].find((data) => data.id === id);
};

const update = async (table, id, data) => {
  const index = db[table].findIndex((data) => data.id === id);
  let updateData = { ...db[table][index] };

  if (data.name) {
    updateData.name = data.name;
  }
  if (data.username) {
    updateData.username = data.username;
  }
  if (data.password) {
    updateData.password = data.password;
  }

  db[table][index] = { id: id, ...updateData };
  return { id: id, ...data };
};

const remove = async (table, id) => {
  const index = db[table].findIndex((data) => data.id === id);
  db[table].splice(index, 1);
  return id;
};

const query = async (table, q) => {
  const user = db[table].find((data) => data.username === q.username) || null;
  return user;
};

module.exports = {
  all,
  list,
  get,
  add,
  update,
  remove, 
  query,
};
