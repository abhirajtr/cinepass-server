import express from "express";
import connectDB from "./infrastructure/database/db";
import cors from "cors"
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();
import { globalErrorHandler } from "./interface/globalErrorHandler";
import { userRoutes } from "./interface/routes/userRoutes";
import { notFoundMiddleware } from "./interface/middlewares/notFoundMiddleware";
import { adminRoutes } from "./interface/routes/adminRoutes";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4000',  // Your client URL
    credentials: true  // Enable sending cookies
}));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(notFoundMiddleware)
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
})
