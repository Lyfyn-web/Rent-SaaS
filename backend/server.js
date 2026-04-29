import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';
import { routes } from './routes.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const app = express();
const prisma = new PrismaClient({ adapter });

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // This allows cookies to be sent
};

app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Helper function to extract userId from either JWT or Clerk token
const extractUserIdFromToken = async (token) => {
    try {
        // First try to verify as JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { userId: decoded.userId, source: 'jwt' };
    } catch (jwtError) {
        // If JWT fails, treat it as a Clerk token
        // For Clerk tokens, we need to extract the userId from the header
        // The Clerk token contains user info that we can use
        console.log("Not a JWT token, may be Clerk token");
        return { userId: null, source: 'clerk', error: jwtError };
    }
};

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});