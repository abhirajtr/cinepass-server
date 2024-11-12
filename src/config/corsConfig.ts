import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:4000', 

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and authorization headers in requests
    maxAge: 600 // Cache the preflight response for faster subsequent requests
};

export default corsConfig;
