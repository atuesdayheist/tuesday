const { Pool } = require('pg');

const pool_dev = new Pool({
  user: 'tuesday_app',
  host: 'localhost',
  database: 'tuesday_dev',
  password: 'bVBCYVzAf5dJe6T',
  port: 5432,
});

const pool_prod = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
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
