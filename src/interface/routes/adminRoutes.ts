import { Router } from "express";
import { AdminController } from "../controllers/AdminController";


const router = Router();
const adminController = new AdminController();

router.post("/login", (req, res, next) => adminController.login(req, res, next));
router.get("/users", (req, res, next) => adminController.getAllUsers(req, res, next));
router.patch("/users/:userId/block", (req, res, next) => adminController.blockUser(req, res, next));
router.get("/theatres", (req, res, next) => adminController.getAllTheatres(req, res, next));
router.patch("/theatres/block", (req, res, next) => adminController.blockUnblockTheatre(req, res, next));
router.patch("/theatres/approve", (req, res, next) => adminController.approveTheatre(req, res, next));
export { router as adminRoutes };