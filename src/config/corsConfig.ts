import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
    origin: '*', 

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and authorization headers in requests
    maxAge: 600 // Cache the preflight response for faster subsequent requests
};

export default corsConfig;
