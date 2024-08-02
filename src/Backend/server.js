const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mock data handling
let mockUsers = [];
let mockDSLNumbers = [];

fs.readFile(path.join(__dirname, 'mockData.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading mock data:', err);
    return;
  }

  try {
    const mockData = JSON.parse(data);
    mockUsers = mockData.mockUsers;
    mockDSLNumbers = mockData.mockDSLNumbers;
  } catch (parseErr) {
    console.error('Error parsing mock data:', parseErr);
  }
});

// User verification endpoint using mock data
app.post('/user_verify', (req, res) => {
  const { userId, password } = req.body;
  console.log('Received request:', req.body);

  const user = mockUsers.find(user => user.username === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User ID not found' });
  }

  if (user.password === password) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

// DSL number check route using mock data
app.post('/api/check-dsl', (req, res) => {
  const { dslNumber } = req.body;
  console.log('Received DSL Number:', dslNumber);

  const dslEntry = mockDSLNumbers.find(entry => entry.dsl_number === dslNumber);

  if (dslEntry) {
    res.json({ dslNumber, platform: dslEntry.platform });
  } else {
    res.status(404).send('DSL number not found');
  }
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
