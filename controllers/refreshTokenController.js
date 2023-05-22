const jwt = require('jsonwebtoken');

function generateNewAccessToken(req, res) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Missing refresh token' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
}

module.exports = { generateNewAccessToken };
