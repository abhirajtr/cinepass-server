import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { jwtAuthMiddleware } from "../middlewares/jwtAuthMiddleware";

const router = Router();

const userController = new UserController();

router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post("/verify-signup", (req, res, next) => userController.verifyAndSignup(req, res, next));
router.post("/resend-otp", (req, res, next) => userController.ResendOtp(req, res, next));
router.post("/login", (req, res, next) => userController.login(req, res, next));
router.get("/profile", jwtAuthMiddleware("user"), (req, res, next) => userController.profile(req, res, next));
router.post("/refresh-token", (req, res, next) => userController.refreshToken(req, res, next));

export { router as userRoutes };