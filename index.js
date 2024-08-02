const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Helper function to read users from file
const getUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Helper function to write users to file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the demo app');
});

// Route to get users
app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Route to add a new user
app.post('/users', (req, res) => {
  const users = getUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
