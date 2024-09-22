import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { DIContainer } from "../../infrastructure/DIContainer";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";

const tokenService = DIContainer.getTokenService();

export interface CustomRequest extends Request {
    userId?: string;
    email?: string;
}

export const jwtAuthMiddleware = (requiredRole: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new UnauthorizedError("Token not provided or malformed"));
        }

        const token = authHeader.split(" ")[1];

        try {
            const decodedData = tokenService.verifyAccessToken(token);
            if (!decodedData) {
                return next(new UnauthorizedError("Invalid or expired token"));
            }

            if (requiredRole && decodedData.role !== requiredRole) {
                return next(new ForbiddenError("Insufficient permissions"));
            }
            req.userId = decodedData.userId
            req.email = decodedData.email;

            next();
        } catch (error) {
            console.log(error);
            next(new UnauthorizedError("Token verification failed"));
        }
    }
}