const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root@123',
  database: process.env.DB_NAME || 'naf_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    process.exit(1); // Exit application on database connection error
  }
  console.log('Connected to the MySQL database.');
});

// User verification endpoint
app.post('/user_verify', (req, res) => {
  const { userId, password } = req.body;
  console.log('Received request:', req.body);

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    console.log('Query results:', results);

    if (results.length === 0) {
      return res.json({ success: false, message: 'User ID not found' });
    }

    const user = results[0];

    if (user.password === password) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Incorrect password' });
    }
  });
});

// DSL number check route
app.post('/api/check-dsl', (req, res) => {
  const { dslNumber } = req.body;
  console.log('Received DSL Number:', dslNumber);

  const query = 'SELECT platform FROM dsl_numbers WHERE dsl_Number = ?';
  console.log('Executing query:', query, 'with value:', dslNumber);

  db.query(query, [dslNumber], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Internal server error');
    }

    console.log('Query Results:', results);

    if (results.length > 0) {
      res.json({ dslNumber, platform: results[0].platform });
    } else {
      res.status(404).send('DSL number not found');
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
