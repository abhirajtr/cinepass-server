import { CorsOptions } from 'cors';

const frontend_url = process.env.FRONTEND_URL;
if (!frontend_url) {
    throw new Error('Cannot load FRONDEN_URL from .env');
}

const corsConfig: CorsOptions = {
    origin: [process.env.FRONTEND_URL!], 

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and authorization headers in requests
    maxAge: 600 // Cache the preflight response for faster subsequent requests
};

export default corsConfig;
