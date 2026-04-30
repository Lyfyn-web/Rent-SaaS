import express from 'express';
import cors from 'cors';
import process from 'node:process';
import './env.js';
import { routes } from './routes.js';

const app = express();

const allowedOrigins = new Set(['http://localhost:5173', 'http://localhost:3000']);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser clients (no Origin header) and known browser origins.
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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