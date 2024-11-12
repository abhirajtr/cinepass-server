import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

// Configuration options for the JWT
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret";
const REFRESH_SECRET = process.env.JWT_ACCESS_SECRET|| "your_refresh_secret";
const ACCESS_EXPIRATION = "15m";
const REFRESH_EXPIRATION = "7d";

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