// routes/protectedRoute.js

import express from 'express';
import authMiddleware from '../middleware/authmiddleware';

const router = express.Router();

// Protected route that requires authentication
router.get('/', authMiddleware, (req, res) => {
    // Access user information from req.user
    res.json({ message: 'Authenticated user', user: req.user });
});

export default router;
