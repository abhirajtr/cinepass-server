import dotenv from 'dotenv';
import express from "express";
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
}).on('error', (error) => {
    logger.error('Error starting server:', error);
    process.exit(1);
});