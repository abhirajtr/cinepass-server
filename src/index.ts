import dotenv from 'dotenv';
dotenv.config();
import express, { Router } from "express";
import { logger } from "./infrastructure/logger";
import { requestLogger } from "./interface/middleware/requestLogger";
import connectDB from "./infrastructure/database/db";
import { errorHandler } from "./interface/middleware/errorHandler";
// import { authRoutes } from "./interface/routes/authRoutes";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsConfig from './config/corsConfig';
// import { adminRoutes } from './interface/routes/adminRoutes';
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

app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});