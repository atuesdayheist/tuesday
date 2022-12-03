const { Pool } = require('pg');

const pool_dev = new Pool({
  user: 'tuesday_app',
  host: 'localhost',
  database: 'tuesday_dev',
  password: 'bVBCYVzAf5dJe6T',
  port: 5432,
});

const pool_prod = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    query: (text, params) => pool_dev.query(text, params),
  };
} else {
  module.exports = {
    query: (text, params) => pool_prod.query(text, params),
  };
}
