import Redis from "ioredis";
import { logger } from "../logger";


class RedisSingleton {
    private static instance: Redis; // Use the default import for both type and instance

    private constructor() {
        // Private constructor prevents direct instantiation
    }

    // Method to retrieve the Redis client instance
    public static getInstance(): Redis {
        if (!RedisSingleton.instance) {
            RedisSingleton.instance = new Redis({
                host: process.env.REDIS_HOST || "127.0.0.1",
                port: Number(process.env.REDIS_PORT) || 6379,
                password: process.env.REDIS_PASSWORD || undefined, // Optional, only if password is needed
            });

            RedisSingleton.instance.on("connect", () => {
                logger.info("Connected to Redis successfully.");
            });

            RedisSingleton.instance.on("error", (error) => {
                logger.error("Redis connection error:", error);
            });
        }
        return RedisSingleton.instance;
    }
}

export const redisClient = RedisSingleton.getInstance();
