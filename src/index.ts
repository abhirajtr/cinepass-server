import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { logger } from "./infrastructure/logger";
import { requestLogger } from "./interface/middleware/requestLogger";
import { corsMiddleware } from "./interface/middleware/corsMiddleware";
import connectDB from "./infrastructure/database/db";
import { errorHandler } from "./interface/middleware/errorHandler";
import { authRoutes } from "./interface/routes/authRoutes";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsConfig from './config/corsConfig';



connectDB();

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.use(cors(corsConfig));

app.use(requestLogger);
app.use("/auth", authRoutes);
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});