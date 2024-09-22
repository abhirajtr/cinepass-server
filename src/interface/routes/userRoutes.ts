import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const userController = new UserController();

router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post("/verify-signup", (req, res, next) => userController.verifyAndSignup(req, res, next));
router.post("/resend-otp", (req, res, next) => userController.ResendOtp(req, res, next));
router.post("/login", (req, res, next) => userController.login(req, res, next));

export { router as userRoutes };