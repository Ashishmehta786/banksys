// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/Apierror.js';

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json(new ApiError(401, 'Unauthorized'));
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json(new ApiError(401, 'Unauthorized'));
    }
};

export default authMiddleware;
