const jwt = require("jsonwebtoken");
const config = require("./../config");
const error = require("./../utils/error");

const sign = (data) => {
  return jwt.sign(data, config.api.jwtSecret);
};

const getToken = (authorization) => {
  if (!authorization) {
    throw error("Invalid authorization", 400);
  }
  if (authorization.indexOf("Bearer ") === -1) {
    throw error("Invalid format", 400);
  }
  let token = authorization.replace("Bearer ", "");
  return token;
};

const verify = (token) => {
  return jwt.verify(token, config.api.jwtSecret);
};

const decode = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
};

const checkUser = (req, user) => {
  const decoded = decode(req);

  if (decoded.id !== user) {
    throw error("Unauthorized", 401);
  } else {
    return true;
  }
};

module.exports = {
  sign,
  checkUser,
};
