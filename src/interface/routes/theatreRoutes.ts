import { Router } from "express";
import { TheatreController } from "../controllers/TheatreController";

const router = Router();
const theatreController = new TheatreController();

router.post('/signup', (req, res, next) => theatreController.signup(req, res, next));
router.post('/signup/verify-otp', (req, res, next) => theatreController.signupVerifyOtp(req, res, next));
router.post('/signup/resend-otp', (req, res, next) => theatreController.signupResendOtp(req, res, next));

export { router as theatreRoutes };