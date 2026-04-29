import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import pkg from '@prisma/client';
const { UserRole, Decimal } = pkg;

const prisma = new PrismaClient();

const routes = Router();

dotenv.config();

routes.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Endpoint to sync/create Clerk users in your database
routes.post('/api/clerk-user-sync', async (req, res) => {
    try {
        const { clerkUserId, email, name } = req.body;

        if (!clerkUserId || !email) {
            return res.status(400).json({ error: 'Missing clerkUserId or email' });
        }

        // Check if user already exists
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create new user from Clerk data
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || 'Clerk User',
                    clerkId: clerkUserId, // Store Clerk ID for mapping
                    password: 'clerk_auth', // Placeholder since Clerk handles auth
                    role: UserRole.USER,
                }
            });
            console.log('New Clerk user created:', user.id);
        } else if (!user.clerkId) {
            // Update existing user with Clerk ID
            user = await prisma.user.update({
                where: { id: user.id },
                data: { clerkId: clerkUserId }
            });
            console.log('Updated existing user with Clerk ID:', user.id);
        }

        res.json({ userId: user.id, message: 'User synced successfully' });
    } catch (error) {
        console.error('Error syncing Clerk user:', error);
        res.status(500).json({ error: 'Failed to sync user' });
    }
});

// Endpoint to get user by Clerk ID
routes.get('/api/users/clerk/:clerkId', async (req, res) => {
    try {
        const { clerkId } = req.params;
        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true, name: true, email: true, phone: true, role: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST request to register a new user
routes.post('/api/register', async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role: role || UserRole.USER, // Use provided role or default to CUSTOMER
            },
            select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }
        });

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('User registration error:', error);

        if (error.code === 'P2002') {
            res.status(409).json({ error: 'A user with this email already exists.' });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    }
});

// POST request to login a user
routes.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        // Generate tokens
        const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Set HTTP-only cookie for refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ message: 'Login successful!', accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

//refresh token route
routes.post('/api/refresh', async (req, res) => {
    const { refreshToken: clientRefreshToken } = req.cookies;

    if (!clientRefreshToken) return res.status(401).json({ error: 'Refresh token required' });

    try {
        const decoded = jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user || user.refreshToken !== clientRefreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Refresh token expired or invalid' });
    }
});

// User Logout
routes.post('/api/logout', async (req, res) => {
    const { userId } = req.body;

    // Invalidate the refresh token
    await prisma.user.update({
        where: { id: userId },
    });

    res.json({ message: 'User logged out successfully' });
});

//user profile
routes.get('/api/users/profile', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true, phone: true, role: true },
        });
        // console.log("Fetched user data:", user); // Add this line to debug
        res.json(user);
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        res.status(401).json({ error: 'Invalid token' });
    }
});


// Update user profile
routes.put('/api/users/profile', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const { name, email, phone, userId } = req.body;

    try {
        let authenticatedUserId;

        // Try to verify as JWT first
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            authenticatedUserId = decoded.userId;
        } catch (jwtError) {
            // If JWT fails, check if userId was provided in the request body
            // This is for Clerk users who provide their ID in the body
            if (userId) {
                authenticatedUserId = userId;
            } else {
                console.log("Token verification failed and no userId provided:", jwtError.message);
                return res.status(401).json({
                    error: 'Invalid or expired token. Please log in again.'
                });
            }
        }

        // Ensure we have a userId
        if (!authenticatedUserId) {
            return res.status(401).json({ error: 'User ID not found' });
        }

        // Update user profile
        const updatedUserData = {
            name,
            email,
            phone,
        };

        const updatedUser = await prisma.user.update({
            where: { id: authenticatedUserId },
            data: updatedUserData,
            select: { id: true, name: true, email: true, phone: true, role: true },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email already in use' });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Define a route to handle password reset requests
routes.post('/api/update-password', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Basic validation
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Please provide email and both passwords.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        // Update the user's password
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: hashedPassword,
            },
        });

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

//function to delete account
routes.delete('/api/delete-account', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const { userId } = req.body; // Accept userId from request body for Clerk users

    try {
        let authenticatedUserId;

        // Try to verify as JWT first
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            authenticatedUserId = decoded.userId;
        } catch (jwtError) {
            // If JWT fails, check if userId was provided in the request body
            if (userId) {
                authenticatedUserId = userId;
            } else {
                console.log("Token verification failed and no userId provided");
                return res.status(401).json({ error: 'Invalid token' });
            }
        }

        if (!authenticatedUserId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }

        // Delete related records first
        await prisma.booking.deleteMany({
            where: { userId: authenticatedUserId },
        });

        await prisma.order.deleteMany({
            where: { userId: authenticatedUserId },
        });

        // Delete the user account
        await prisma.user.delete({
            where: { id: authenticatedUserId },
        });

        res.json({ message: 'Account deleted successfully.' });
    } catch (error) {
        console.error('Error deleting account:', error);
        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'Cannot delete user due to foreign key constraints.' });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

export { routes };
