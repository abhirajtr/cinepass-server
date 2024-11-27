import { Router } from "express";
import { AdminController } from "../controller/AdminController";
import { UserController } from "../controller/userController";
import { TheatreOwnerController } from "../controller/TheatreOwnerController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { TheatreController } from "../controller/TheatreController";

const router = Router();
const adminController = new AdminController();
const userController = new UserController();
const theatreOwnerController = new TheatreOwnerController();
const theatreController = new TheatreController();

router.post("/login", (req, res, next) => adminController.login(req, res, next));
router.post("/logout", (req, res, next) => adminController.logout(req, res, next));
router.get("/users", jwtMiddleware("admin"), (req, res, next) => userController.getAllUsers(req, res, next));
router.patch("/users/:userId/toggle-block", jwtMiddleware("admin"), (req, res, next) => userController.toggleBlock(req, res, next));
router.get("/theatreOwners", jwtMiddleware("admin"), (req, res, next) => theatreOwnerController.getAllTheatreOwners(req, res, next));
router.patch("/theatreOwners/:userId/toggle-block", jwtMiddleware("admin"), (req, res, next) => theatreOwnerController.toggleBlock(req, res, next));
router.post("/refresh-token", (req, res, next) => adminController.handleRefreshToken(req, res, next));
router.get("/theatres", jwtMiddleware("admin"), (req, res, next) => theatreController.getAllTheatresAdmin(req, res, next));
router.get("/theatre/get-presigned-url", jwtMiddleware("admin"), (req, res, next) => theatreController.getDocumentUrl(req, res, next));



export { router as adminRoutes };