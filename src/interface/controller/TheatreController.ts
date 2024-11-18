import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middleware/jwtMiddleware";


export class TheatreController {
    private addTheatreTheatreOnwnerUseCase = DIContainer.getAddTheatreTheatreOwnerUseCase();
    private getAllTheatresTheatreOwnerUseCase = DIContainer.getAllTheatresTheatreOwnerUseCase();

    async addTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            console.log("Received data for adding a theatre:", req.body);
            console.log("Uploaded file details:", req.file);
            const userId = req.userId;
            const { theatreName, contactEmail, contactNumber, streetAddress, city, state, zipCode, ownerId } = req.body;
            const verificationDocument = req.file?.fieldname
            if (!verificationDocument) {
                res.status(400).json({ message: "Verification document is required." });
                return;
            }
            const theatre = {
                theatreName,
                contactEmail,
                contactNumber,
                streetAddress,
                city,
                state,
                zipCode,
                verificationDocument,
                ownerId: userId!
            };
            const newTheatre = await this.addTheatreTheatreOnwnerUseCase.execute(theatre);
            res.status(200).json({ message: 'Theatre added successfully', theatre: newTheatre });
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatres(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const theatres = await this.getAllTheatresTheatreOwnerUseCase.execute(userId!);
            res.status(200).json({ theatres })
        } catch (error) {
            next(error);
        }
    }
}