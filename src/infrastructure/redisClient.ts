// import Redis from "ioredis";

// // Initialize Redis client
// const redisClient = new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1", // Default host
//     port: parseInt(process.env.REDIS_PORT || "6379"), // Default port
//     password: process.env.REDIS_PASSWORD, // Only if your Redis requires a password
// });

// // Handle connection events
// redisClient.on("connect", () => {
//     console.log("Connected to Redis successfully.");
// });

// redisClient.on("error", (err) => {
//     console.error("Redis connection error:", err);
// });

// export { redisClient };
