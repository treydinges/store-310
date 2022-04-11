const { Pool } = require('pg')

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'store',
  password: '1234',
  post: 5432
})

module.exports = pool