const mySql = require('mysql2')
require('dotenv').config()

const DBConnect = mySql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
})

module.exports = DBConnect
