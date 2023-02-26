require('dotenv').config()

const config = {
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPort: process.env.DB_PORT,
  superSecret: process.env.SUPER_SECRET,
  env: process.env.ENVIRONMENT
}

module.exports = config
