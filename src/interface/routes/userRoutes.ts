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
router.put("/update-details", jwtAuthMiddleware("user"), (req, res, next) => userController.updateDetails(req, res, next));
router.put("/update-password", jwtAuthMiddleware("user"), (req, res, next) => userController.updatePassword(req, res, next));
router.post("/forgot-password", (req, res, next) => userController.forgotPassword(req, res, next));
router.post("/forgot-password/verify-otp", (req, res, next) => userController.forgotPasswordVerfiyOtp(req, res, next));
router.post("/password-reset", (req, res, next) => userController.resetUserPassword(req, res, next));


export { router as userRoutes };