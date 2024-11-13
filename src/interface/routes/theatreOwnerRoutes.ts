import { Router } from "express";
import upload from "../../config/multerConfig";
import { TheatreOwnerController } from "../controller/TheatreOwnerController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const router = Router();
const theatreOwnerController = new TheatreOwnerController();

router.post("/theatre/add", jwtMiddleware("theatreOwner"), upload.single('verificationDocument'), (req, res, next) => theatreOwnerController.addTheatre(req, res, next));
router.get("/theatre/add", jwtMiddleware("theatreOwner"), (req, res, next) => theatreOwnerController.addTheatre(req, res, next));

export { router as theatreOwnerRoutes };