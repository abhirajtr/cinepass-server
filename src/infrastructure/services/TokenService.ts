import { decodedData, ITokenService } from "../../domain/interfaces/ITokenService";
import jwt from "jsonwebtoken";

export class TokenService implements ITokenService {
    private ACCESS_TOKEN_SECRET;
    private REFRESH_TOKEN_SECRET;
    constructor() {
        this.ACCESS_TOKEN_SECRET = 'sec';
        this.REFRESH_TOKEN_SECRET = 'sec';
    }

    generateAccessToken(userId: string, email: string, role: string): string {
        return jwt.sign({ userId, email, role }, this.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }
    generateRefreshToken(userId: string, email: string, role: string): string {
        return jwt.sign({ userId, email, role }, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
    verifyAccessToken(token: string): decodedData {
        return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as decodedData;
    }
    verifyRefreshToken(token: string): decodedData {
        return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as decodedData;
    }
}