const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token if it has Bearer prefix
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = { authMiddleware }