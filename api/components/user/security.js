const auth = require("./../../../auth");

const checkRole = (action) => {
  const middleware = (req, res, next) => {
    switch (action) {
      case "update":
        const user = req.params.id;
        auth.checkUser(req, user);
        next();
        break;

      case "follow":
        auth.checkToken(req);
        next();
        break;

      default:
        next();
    }
  };

  return middleware;
};

module.exports = checkRole;
