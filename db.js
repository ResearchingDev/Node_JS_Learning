const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Database host (from .env)
  user: process.env.DB_USER,  // Database user (from .env)
  password: process.env.DB_PASSWORD,  // Database password (from .env)
  database: process.env.DB_NAME,  // Database name (from .env)
  port: process.env.DB_PORT,  // Database name (from .env)
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

// Export the database connection
module.exports = db;
