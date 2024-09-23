import { Request, Response, NextFunction } from 'express';

// Middleware for handling 404 - Not Found
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
};
