// server/app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load user data from JSON file
let users = [];
try {
  const userData = fs.readFileSync('./db/users.json');
  users = JSON.parse(userData);
} catch (error) {
  console.error("Error reading user data:", error);
}

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Log user login with IP
    const userIP = req.ip || req.connection.remoteAddress;
    console.log(`User ${username} logged in from IP ${userIP} at ${new Date().toLocaleString()}`);
    
    // Update user's last login IP
    user.lastLoginIP = userIP;
    
    // Save updated user data
    fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2));

    res.sendStatus(200);
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

// Route to get user login information
app.get('/user-info', (req, res) => {
  res.json(users.map(user => ({
    username: user.username,
    lastLogin: user.lastLogin,
    lastLoginIP: user.lastLoginIP
  })));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
