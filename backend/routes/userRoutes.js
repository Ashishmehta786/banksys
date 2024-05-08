// routes/userRoutes.js

import express from 'express';
import User from '../models/User.js';
// import UserController from '../controllers/UserController.js';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authmiddleware.js'
const router = express.Router();

// Registration route
router.post('/register', UserController.register);

// Login route
router.post('/login', UserController.login);
router.post('/logout', authMiddleware, UserController.logout);

router.get('/dashboard', async (req, res, next) => {
    try {
        // Check if userData cookie exists
        const userDataCookie = req.cookies.userData;
        if (!userDataCookie) {
            throw new ApiError(401, 'User not authenticated');
        }

        // Parse user information from the cookie
        const user = JSON.parse(userDataCookie);
        console.log(user)
        // Attach user information to the request object
        req.user = user;

        // Call the next middleware
        next();
    } catch (error) {
        console.error('Error retrieving user from cookie:', error.message);
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }

});


export default router;
