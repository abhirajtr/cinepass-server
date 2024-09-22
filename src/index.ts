import express from "express";
import connectDB from "./infrastructure/database/db";
import cors from "cors"
import { configDotenv } from "dotenv";
configDotenv();
import { globalErrorHandler } from "./interface/globalErrorHandler";
import { userRoutes } from "./interface/routes/userRoutes";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/user", userRoutes);
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
})
