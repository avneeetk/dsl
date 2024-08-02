const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root@123',
  database: process.env.DB_NAME || 'naf_platform'
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
