import { Request, Response, NextFunction } from "express";

// CORS middleware
export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Allow all origins
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

    // Allow specific headers
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

    // Allow credentials (if necessary)
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.status(200).end();  // Respond to OPTIONS requests without returning
        return;  // No need to call next() if response is already sent
    }

    // Continue to the next middleware or route handler
    next();
};
