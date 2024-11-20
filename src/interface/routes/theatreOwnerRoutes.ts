import { Router } from "express";
import { TheatreOwnerController } from "../controller/TheatreOwnerController";
import upload from "../../config/multerConfig";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { TheatreController } from "../controller/TheatreController";
// import upload from "../../config/multerConfig";
// import { jwtMiddleware } from "../middleware/jwtMiddleware";

const router = Router();
const theatreOwnerController = new TheatreOwnerController();
const theatreController = new TheatreController();

router.post("/signup", (req, res, next) => theatreOwnerController.signup(req, res, next));
router.post("/resent-otp", (req, res, next) => theatreOwnerController.resendOtp(req, res, next));
router.post("/verify-otp", (req, res, next) => theatreOwnerController.verifyOtp(req, res, next));
router.post("/login", (req, res, next) => theatreOwnerController.login(req, res, next));
router.post("/forgot-password", (req, res, next) => theatreOwnerController.forgotPassword(req, res, next));
router.post("/reset-password", (req, res, next) => theatreOwnerController.resetPassword(req, res, next));
router.post("/theatres/add", jwtMiddleware("theatreOwner"), upload.single("verificationDocument"), (req, res, next) => theatreController.addTheatre(req, res, next));
router.get("/getAllTheatres", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getAllTheatres(req, res, next));
router.post("/refresh-token", (req, res, next) => theatreOwnerController.refreshOnPageLoad(req, res, next));
router.post("/logout", (req, res, next) => theatreOwnerController.logout(req, res, next));




// router.post("/theatre/add", jwtMiddleware("theatreOwner"), upload.single('verificationDocument'), (req, res, next) => theatreOwnerController.addTheatre(req, res, next));
// router.get("/theatres", jwtMiddleware("theatreOwner"), (req, res, next) => theatreOwnerController.getTheatres(req, res, next));

export { router as theatreOwnerRoutes };