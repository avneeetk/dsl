const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

const getUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

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
