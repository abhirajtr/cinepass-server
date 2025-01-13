import { Router } from "express";
import { TheatreOwnerController } from "../controller/TheatreOwnerController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { TheatreController } from "../controller/TheatreController";
import { MovieController } from "../controller/MovieController";
import { ShowController } from "../controller/ShowController";

const router = Router();
const theatreOwnerController = new TheatreOwnerController();
const theatreController = new TheatreController();
const movieController = new MovieController();
const showController = new ShowController();

router.post("/signup", (req, res, next) => theatreOwnerController.signup(req, res, next));
router.post("/resent-otp", (req, res, next) => theatreOwnerController.resendOtp(req, res, next));
router.post("/verify-otp", (req, res, next) => theatreOwnerController.verifyOtp(req, res, next));
router.post("/login", (req, res, next) => theatreOwnerController.login(req, res, next));
router.post("/forgot-password", (req, res, next) => theatreOwnerController.forgotPassword(req, res, next));
router.post("/reset-password", (req, res, next) => theatreOwnerController.resetPassword(req, res, next));
router.get("/getAllTheatres", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getAllTheatres(req, res, next));
// router.post("/refresh-token", (req, res, next) => theatreOwnerController.refreshOnPageLoad(req, res, next));
router.post("/logout", (req, res, next) => theatreOwnerController.logout(req, res, next));
router.post("/theatres/add", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.addTheatre(req, res, next));
router.get("/theatres/:theatreId", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getTheatreDetailsTheatreOwner(req, res, next));
router.patch("/theatres/:theatreId/edit", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.editTheatre(req, res, next));
router.get("/movies", jwtMiddleware("theatreOwner"), (req, res, next) => movieController.getAllMoviesAdmin(req, res, next));
router.get("/theatre/get-presigned-url", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getDocumentUrl(req, res, next));
router.post("/theatre/:theatreId/add-screen", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.addScreen(req, res, next));
router.get("/theatre/:theatreId/getAllScreens", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getAllScreens(req, res, next));
router.post("/theatre/screen/add-show", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.addShow(req, res, next));
router.get("/screen/:screenId/shows", jwtMiddleware("theatreOwner"), (req, res, next) => theatreController.getAllShowsByScreen(req, res, next));
router.get("/dashboard", jwtMiddleware("theatreOwner"), (req, res, next) => theatreOwnerController.getTotalTicketSales(req, res, next));
router.get("/showBookingDetails/:showId", jwtMiddleware("theatreOwner"), (req, res, next) => showController.getShowBookingDetails(req, res, next));
router.get("/movie/:movieId/details", (req, res, next) => movieController.getMovieDetails(req, res, next));
router.get("/bookedBy/:showId", (req, res, next) => showController.getBookedBy(req, res, next));
router.put("/update-show/:showId", jwtMiddleware("theatreOwner"), (req, res, next) => showController.updateShow(req, res, next))






export { router as theatreOwnerRoutes };