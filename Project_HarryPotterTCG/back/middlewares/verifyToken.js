import jwt from 'jsonwebtoken';

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    
    if (!token) {
        console.log('No token provided'); // Debug: Log no token
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log('Token verified, user ID:', req.userId); // Debug: Log the user ID
        next();
    } catch (error) {
        console.error('Invalid token:', error); // Debug: Log the token error
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default verifyTokenMiddleware;
