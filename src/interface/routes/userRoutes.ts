import { Router } from "express";
import { UserController } from "../controller/userController";
import { MovieController } from "../controller/MovieController";
import { ShowController } from "../controller/ShowController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { TheatreController } from "../controller/TheatreController";

const router = Router()

const userController = new UserController();
const movieController = new MovieController();
const showController = new ShowController();
const theatreController = new TheatreController();


router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post("/resent-otp", (req, res, next) => userController.resendOtp(req, res, next));
router.post("/verify-otp", (req, res, next) => userController.verifyOtp(req, res, next));
router.post("/login", (req, res, next) => userController.loginUser(req, res, next));
router.post("/forgot-password", (req, res, next) => userController.forgotPasswordUser(req, res, next));
router.post("/reset-password", (req, res, next) => userController.resetPasswordUser(req, res, next));
router.get("/movies/nowShowing", (req, res, next) => movieController.getNowShowingMovies(req, res, next));
router.get("/movie/:movieId/details", (req, res, next) => movieController.getMovieDetails(req, res, next));
router.get("/movie/:movieId/shows", (req, res, next) => showController.getShowsByMovieId(req, res, next));
router.get("/seat-selection/:showId", (req, res, next) => showController.getShowDetails(req, res, next));
router.post("/book-seat", jwtMiddleware("regularUser"), (req, res, next) => showController.bookSeats(req, res, next));
router.get("/seat-booking/success", (req, res, next) => showController.bookSeatsSuccess(req, res, next));
router.get("/booking-history", jwtMiddleware("regularUser"), (req, res, next) => showController.bookings(req, res, next));

router.get("/movie/:movieId/theatres", (req, res, next) => movieController.getTheatresForMovie(req, res, next));

router.get('/qrcode', (req, res, next) => showController.getQrCOde(req, res, next));
router.get('/movies', (req, res, next) => movieController.searchMovie(req, res, next));
router.get('/theatres', (req, res, next) => theatreController.getTheatres(req, res, next));
router.get('/getUserInfo', jwtMiddleware("regularUser"), (req, res, next) => userController.getUserInfo(req, res, next));
router.post('/update-name', jwtMiddleware("regularUser"), (req, res, next) => userController.updateUserName(req, res, next));
router.put('/update-password', jwtMiddleware("regularUser"), (req, res, next) => userController.updatePassword(req, res, next));




export { router as userRoutes };