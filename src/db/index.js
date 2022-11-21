const { Pool } = require('pg');

const pool = new Pool({
  user: 'tuesday_app',
  host: 'localhost',
  database: 'tuesday_dev',
  password: 'bVBCYVzAf5dJe6T',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
