export interface IUserData {
    userId: string;
    email: string;
    phone?: string;
    password: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    username?: string;
    location?: string;
    name?: string;
}
export interface IRedisService {
    storeOTP(email: string, otp: string, expiry: number): Promise<void>;
    storeUser(email: string, userData: IUserData, expiry: number): Promise<void>;
    getOTP(email: string): Promise<string | null>;
    getUserData(email: string): Promise<IUserData>;
    deleteUserFromRedis(email: string): Promise<void>;
}