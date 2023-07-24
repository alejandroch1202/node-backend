const express = require("express");
const config = require("./../config");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("./../network/errors");
const db = require("./components/db/network");
const swagger = require("swagger-ui-express");

const app = express();
const docs = require("./swagger.json");

app.use(express.json());
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/db", db);
app.use("/api/docs", swagger.serve, swagger.setup(docs));
app.use(errors);

app.listen(
  config.api.port,
  console.log(`[server] Running on http://localhost:${config.api.port}`)
);
