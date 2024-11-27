import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router()

const userController = new UserController();


router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post("/resent-otp", (req, res, next) => userController.resendOtp(req, res, next));
router.post("/verify-otp", (req, res, next) => userController.verifyOtp(req, res, next));
router.post("/login", (req, res, next) => userController.loginUser(req, res, next));
router.post("/forgot-password", (req, res, next) => userController.forgotPasswordUser(req, res, next));
router.post("/reset-password", (req, res, next) => userController.resetPasswordUser(req, res, next));


export { router as userRoutes };