import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";
const ACCESS_EXPIRATION = process.env.ACCESS_EXPIRATION || '15m';
const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || '7d';

export function generateResetToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '3m' });
}
export function verifyResetToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
    } catch {
        return null; 
    }
}

export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRATION });
}

export function generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });
}

export function verifyAccessToken(token: string): JwtPayload | null {
    try {        
        return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
    } catch {
        return null;
    }
}
