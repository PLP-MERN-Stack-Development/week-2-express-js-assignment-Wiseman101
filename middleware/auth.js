
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== '12345') {
    return res.status(401).json({ message: 'Unauthorized. Invalid API Key 🔒' });
  }

  next(); 
};

module.exports = authMiddleware;
