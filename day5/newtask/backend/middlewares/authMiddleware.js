const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token if it has Bearer prefix
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
        req.user = decoded
        
        // Add debug log
        console.log("Auth middleware decoded token:", decoded);
        
        // If role is not in the token, try to fetch from the database
        if (!decoded.role) {
            console.log("Role not found in token, fetching from database");
            const user = await User.findById(decoded.id).select('role');
            if (user) {
                req.user.role = user.role;
                console.log("Role fetched from database:", user.role);
            }
        }
        
        next()
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

const adminMiddleware = async (req, res, next) => {
    // First authenticate the user
    authMiddleware(req, res, async () => {
        // Then check if user is admin
        if (req.user && req.user.role === 'admin') {
            console.log("Admin access granted for user:", req.user.id);
            next();
        } else {
            console.log("Admin access denied for user:", req.user?.id, "with role:", req.user?.role);
            // If role wasn't provided in token, check database directly
            if (req.user && !req.user.role) {
                try {
                    const user = await User.findById(req.user.id).select('role');
                    if (user && user.role === 'admin') {
                        req.user.role = 'admin';
                        console.log("Admin access granted after database check");
                        return next();
                    }
                } catch (error) {
                    console.error("Error checking admin role in database:", error);
                }
            }
            return res.status(403).json({ message: 'Access denied: Admin privileges required' });
        }
    });
}

module.exports = { authMiddleware, adminMiddleware }