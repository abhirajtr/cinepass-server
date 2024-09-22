import { RedisClientType } from "redis";
import { IRedisService, IUserData } from "../../domain/interfaces/IRedisService";
import { RedisConnection } from "../database/RedisConnection";

export class RedisService implements IRedisService {
    private client: RedisClientType;

    constructor() {
        this.client = RedisConnection.getClient();
    }
    async storeOTP(email: string, otp: string, expiry: number): Promise<void> {
        await this.client.set(`otp:${email}`, otp, { EX: expiry });
    }

    async storeUser(email: string, userData: IUserData, expiry: number): Promise<void> {
        try {
            await this.client.set(`user:${email}`, JSON.stringify(userData), { EX: expiry });
        } catch (error) {
            console.error('Error storing user with OTP in Redis:', error);
            throw new Error('Could not store user data in Redis');
        }
    }

    async getOTP(email: string): Promise<string | null> {
        const otp = await this.client.get(`otp:${email}`);
        return otp;
    }

    async getUserData(email: string): Promise<IUserData> {
        try {
            const userData = await this.client.get(`user:${email}`);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data from Redis:', error);
            throw new Error('Could not get user data from Redis');
        }
    }

    async deleteUserFromRedis(email: string): Promise<void> {
        try {
            await this.client.del(`otp:${email}`);
            await this.client.del(`user:${email}`);
        } catch (error) {
            console.error('Error deleting user from Redis:', error);
            throw new Error('Could not delete user data from Redis');
        }
    }
}