import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { UserRole } from "../../domain/entities/User";

const router = Router();

const authController = new AuthController();


router.post("/signup/user", (req, res, next) => authController.signup(req, res, next, UserRole.RegularUser));
router.post("/signup/theatreOwner", (req, res, next) => authController.signup(req, res, next, UserRole.TheatreOwner));
router.post("/verify-otp", (req, res, next) => authController.verifyOtp(req, res, next));
router.post("/signup/resend-otp", (req, res, next) => authController.resendSignupOtp(req, res, next));
router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/password-reset/request", (req, res, next) => authController.requestPasswordReset(req, res, next));
router.post("/password-reset/verify", (req, res, next) => authController.verifyPasswordResetOtp(req, res, next));
router.post("/password-reset/complete", (req, res, next) => authController.resetPassword(req, res, next));
router.post("/password-reset/resend-otp", (req, res, next) => authController.resendPasswordResetOtp(req, res, next));


export { router as authRoutes };