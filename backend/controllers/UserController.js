// controllers/userController.js

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ApiError } from '../utils/Apierror.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const UserController = {
    async register(req, res) {
        const { name, username, email, password, address, adhar, pan } = req.body;

        try {
            // Check if the username or email is already registered
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                throw new ApiError(400, 'Username or email is already registered');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const newUser = await User.create({ name, username, email, password: hashedPassword, address, adhar, pan });

            // Generate JWT token
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.status(201).json(new ApiResponse(201, { token }, 'User registered successfully'));
        } catch (error) {
            console.error('Registration error:', error.message);
            res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
        }
    },


    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Find the user by username
            const user = await User.findOne({ username });
            if (!user) {
                throw new ApiError(404, 'User not found');
            }

            // Check if the password is correct
            const isPasswordCorrect = user.isPasswordCorrect(password);
            if (!isPasswordCorrect) {
                throw new ApiError(401, 'Invalid credentials');
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // Save user information in a cookie
            res.cookie('userData', JSON.stringify(user), { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Send response with user and token
            res.status(200).json(new ApiResponse(200, { user, token }, 'Login successful'));
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
        }
    }
    , async logout(req, res) {
        try {
            // You don't need to do anything to invalidate the token on the server side
            // The client should handle token removal

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};

export default UserController;
