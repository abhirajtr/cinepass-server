import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://yourfrontend.com'
        : 'http://localhost:4000', 

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and authorization headers in requests
    maxAge: 600 // Cache the preflight response for faster subsequent requests
};

export default corsConfig;
