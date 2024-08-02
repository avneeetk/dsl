const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { mockUsers, mockDSLNumbers } = require('./Backend/mockdata.js'); // Import mock data

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// User verification endpoint
app.post('/user_verify', (req, res) => {
  const { userId, password } = req.body;
  console.log('Received request:', req.body);

  // Find user in mock data
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

// DSL number check route
app.post('/api/check-dsl', (req, res) => {
  const { dslNumber } = req.body;
  console.log('Received DSL Number:', dslNumber);

  // Find DSL number in mock data
  const dsl = mockDSLNumbers.find(dsl => dsl.dsl_number === dslNumber);

  if (dsl) {
    res.json({ dslNumber, platform: dsl.platform });
  } else {
    res.status(404).send('DSL number not found');
  }
});

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
