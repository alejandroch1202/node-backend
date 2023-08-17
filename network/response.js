exports.success = (req, res, message, status) => {
  const statusCode = status || 200
  const statusMessage = message || 'Ok'

  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

exports.error = (req, res, message, status, error) => {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'

  console.log(error)

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}
