import { Router } from "express";
import { UserController } from "../controller/userController";
import { MovieController } from "../controller/MovieController";

const router = Router()

const userController = new UserController();
const movieController = new MovieController();


router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post("/resent-otp", (req, res, next) => userController.resendOtp(req, res, next));
router.post("/verify-otp", (req, res, next) => userController.verifyOtp(req, res, next));
router.post("/login", (req, res, next) => userController.loginUser(req, res, next));
router.post("/forgot-password", (req, res, next) => userController.forgotPasswordUser(req, res, next));
router.post("/reset-password", (req, res, next) => userController.resetPasswordUser(req, res, next));
router.get("/movies/nowShowing", (req, res, next) => movieController.getNowShowingMovies(req, res, next));
router.get("/movie/:movieId/details", (req, res, next) => movieController.getMovieDetails(req, res, next));


export { router as userRoutes };