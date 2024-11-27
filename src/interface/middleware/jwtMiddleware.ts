import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { UserRole } from "../../domain/entities/User";


export interface CustomRequest extends Request {
    userId?: string;
    email?: string;
}

export const jwtMiddleware = (requiredRole: UserRole) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        // console.log("authHeader",authHeader); 
        

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new UnauthorizedError("Token not provided or malformed"));
        }

        const token = authHeader.split(" ")[1];

        try {
            const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
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