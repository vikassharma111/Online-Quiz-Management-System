const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, unauthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
