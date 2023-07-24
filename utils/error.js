const error = (message, status) => {
  let err = new Error(message);

  if (status) {
    err.statusCode = status;
  }

  return err;
};

module.exports = error;
