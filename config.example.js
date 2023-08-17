module.exports = {
  api: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_SECRET'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'YOUR_MYSQL_HOST',
    user: process.env.MYSQL_USER || 'YOUR_MYSQL_USER',
    password: process.env.MYSQL_PASSWORD || 'YOUR_MYSQL_PASSWORD',
    database: process.env.MYSQL_DB || 'YOUR_MYSQL_DB',
    port: process.env.MYSQL_PORT || 'YOUR_MYSQL_PORT'
  }
}
