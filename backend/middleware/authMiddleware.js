const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // 1. Token header se nikalna
  const token = req.header('Authorization');

  // 2. Agar token nahi hai
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    // 3. Token verify karna (Format: "Bearer your_token_here")
    const actualToken = token.split(' ')[1] || token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    // 4. User data ko request me daal dena taaki aage use ho sake
    req.user = decoded.user; 
    next(); // Guard ne pass kar diya, ab aage jao
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token!' });
  }
};