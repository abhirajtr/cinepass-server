export interface decodedData {
    userId: string;
    email: string;
    role: string;
}
export interface ITokenService {
    generateAccessToken(userId: string, email: string, role: string): string;
    generateRefreshToken(userId: string, email: string, role: string): string;
    verifyAccessToken(token: string): decodedData;
    verifyRefreshToken(token: string): decodedData;
}