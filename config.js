require('dotenv').config()

const config = {
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPort: process.env.PORT
}

module.exports = { config }
