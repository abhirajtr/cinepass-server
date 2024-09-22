import { createClient, RedisClientType } from "redis";

export class RedisConnection {
    private static client: RedisClientType;

    // Connect to Redis
    public static async connect(): Promise<void> {
        console.log('Connecting to Redis...');
        
        if (!RedisConnection.client) {
            RedisConnection.client = createClient({
                url: process.env.REDIS_URL,
            });
        }
        
        RedisConnection.client.on('error', (err) => {
            console.log('Redis client error:', err);
        });

        try {
            await RedisConnection.client.connect();
            console.log('Connected to Redis');
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
        }
    }

    // Retrieve Redis client instance
    public static getClient(): RedisClientType { 
        if (!RedisConnection.client) {
            throw new Error('Redis client is not connected. Call RedisConnection.connect() first.');
        }
        return RedisConnection.client;
    }
}

// Automatically connect to Redis when this module is imported
(async () => {
    await RedisConnection.connect();
})();
