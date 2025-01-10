import dotenv from 'dotenv';
import express from "express";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import connectDB from "./infrastructure/database/db";
import corsConfig from './config/corsConfig';

import { logger } from "./infrastructure/logger";
import { requestLogger } from "./interface/middleware/requestLogger";
import { errorHandler } from "./interface/middleware/errorHandler";

import { theatreOwnerRoutes } from './interface/routes/theatreOwnerRoutes';
import { userRoutes } from './interface/routes/userRoutes';
import { adminRoutes } from './interface/routes/adminRoutes';



connectDB();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    },
}); 

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

app.use("/user", userRoutes);
app.use("/theatreOwner", theatreOwnerRoutes);
app.use("/admin", adminRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


app.use(errorHandler);
io.on('connect', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('sendNotification', (data) => {
        console.log('Notification data received:', data);

        io.emit('receiveNotification', { message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
}).on('error', (error) => {
    logger.error('Error starting server:', error);
    process.exit(1);
})