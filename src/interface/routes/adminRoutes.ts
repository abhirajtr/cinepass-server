import { Router } from "express";
import { AdminController } from "../controller/AdminController";

const router = Router();

const adminController = new AdminController();

router.get("/users", (req, res, next) => adminController.getAllUsersByType(req, res, next, "regularUser"));
router.post("/users/block-unblock", (req, res, next) => adminController.blockUnblockUserByType(req, res, next, "regularUser"));

export { router as adminRoutes };