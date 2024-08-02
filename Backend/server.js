const express = require('express');
const cors = require('cors');
const path = require('path');
const { mockUsers, mockDSLNumbers } = require('./Backend/mockdata.js'); // Import mock data

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow requests with no origin, like curl requests
    if (origin === 'https://your-frontend-domain.com' || origin === 'http://localhost:3000') { // Specify allowed origins
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// User verification endpoint using mock data
app.post('/user_verify', (req, res) => {
  const { userId, password } = req.body;
  console.log('Received request:', req.body);

  const user = mockUsers.find(user => user.username === userId);

  if (!user) {
    return res.json({ success: false, message: 'User ID not found' });
  }

  if (user.password === password) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false, message: 'Incorrect password' });
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
