import express from 'express';
import cors from 'cors';
import process from 'node:process';
import './env.js';
import { routes } from './routes.js';

const app = express();

const defaultOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
];

const envOrigins = (process.env.CLIENT_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

const isLocalBrowserOrigin = (origin) => {
    try {
        const parsed = new URL(origin);
        return (
            (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') &&
            (parsed.protocol === 'http:' || parsed.protocol === 'https:')
        );
    } catch {
        return false;
    }
};

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser clients (no Origin header) and known browser origins.
        if (!origin || allowedOrigins.has(origin) || isLocalBrowserOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // This allows cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.options(/.*/, cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});