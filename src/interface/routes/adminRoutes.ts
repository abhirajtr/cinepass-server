import { Router } from "express";
import { AdminController } from "../controllers/AdminController";


const router = Router();
const adminController = new AdminController();

router.post("/login", (req, res, next) => adminController.login(req, res, next));

export { router as adminRoutes };