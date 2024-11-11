import { Request, Response, NextFunction } from "express";
import { logger } from "../../infrastructure/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Log the method, URL, and body of the request
    logger.info({
        method: req.method,
        url: req.originalUrl,
        body: req.body,
    });

    // Continue to the next middleware/route handler
    next();
};
