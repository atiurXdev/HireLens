const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Force a connection test right when the server starts
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('PostgreSQL Database Connected Successfully!');
    release(); // Release the client back to the pool
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};