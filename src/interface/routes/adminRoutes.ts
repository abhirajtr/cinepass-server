import { Router } from "express";
import { AdminController } from "../controller/AdminController";

const router = Router();
const adminController = new AdminController();

router.post("/login", (req, res, next) => adminController.login(req, res, next));


export { router as adminRoutes };

// import { Router } from "express";
// import { AdminController } from "../controller/AdminController";

// const router = Router();

// const adminController = new AdminController();

// router.get("/users", (req, res, next) => adminController.getAllUsersByType(req, res, next, "regularUser"));
// router.post("/users/block-unblock", (req, res, next) => adminController.blockUnblockUserByType(req, res, next, "regularUser"));
// // router.get("/theatres", (req, res, next) => {
// //     console.log('Hello');
    
// // });
// router.get("/theatres", (req, res, next) => adminController.getTheatres(req, res, next));

// export { router as adminRoutes };