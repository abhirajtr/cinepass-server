// src/infrastructure/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbURI = process.env.DB_URL || 'mongodb://localhost:27017/cinepass';

        await mongoose.connect(dbURI);

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
