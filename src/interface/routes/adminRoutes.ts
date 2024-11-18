import { Router } from "express";
import { AdminController } from "../controller/AdminController";
import { UserController } from "../controller/userController";
import { TheatreOwnerController } from "../controller/TheatreOwnerController";

const router = Router();
const adminController = new AdminController();
const userController = new UserController();
const theatreOwnerController = new TheatreOwnerController();

router.post("/login", (req, res, next) => adminController.login(req, res, next));
router.get("/users", (req, res, next) => userController.getAllUsers(req, res, next));
router.get("/theatreOwners", (req, res, next) => theatreOwnerController.getAllTheatreOwners(req, res, next));
router.patch("/theatreOwners/:userId/toggle-block", (req, res, next) => theatreOwnerController.toggleBlock(req, res, next));
router.patch("/users/:userId/toggle-block", (req, res, next) => userController.toggleBlock(req, res, next));


export { router as adminRoutes };