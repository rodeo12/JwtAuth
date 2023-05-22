const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate' });
  }
}

function logout(req, res) {
  // Implement blacklisting logic here
  res.json({ message: 'Logged out successfully' });
}

function generateAccessToken(user) {
  return jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1m',
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ username: user.username, role: user.role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '5m',
  });
}

module.exports = { signup, login, logout };
