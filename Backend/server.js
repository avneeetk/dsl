const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3306;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: '122.161.50.196',
  user: 'root',
  password: 'Root@123',  // Ensure the password is correct
  database: 'naf_platform'   // Ensure the database name is correct
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
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
      return res.json({ success: false, message: 'Database error' });
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
  console.log('Received DSL Number:', dslNumber); // Log the received DSL number

  const query = 'SELECT platform FROM dsl_numbers WHERE dsl_Number = ?';
  console.log('Executing query:', query, 'with value:', dslNumber);

  db.query(query, [dslNumber], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Internal server error');
      return;
    }

    console.log('Query Results:', results); // Log the query results

    if (results.length > 0) {
      res.json({ dslNumber, platform: results[0].platform });
    } else {
      res.status(404).send('DSL number not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
