import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middleware/jwtMiddleware";


export class TheatreOwnerController {

    private addTheatreUseCase = DIContainer.getAddTheatreUseCase();

    async addTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            console.log(req.file?.filename);
            const { ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode } = req.body;
            console.log(
                ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode
            );
            const verificationDocument = req.file?.filename as string
            await this.addTheatreUseCase.addTheatre({ ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode, verificationDocument });
            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async getTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            
        } catch (error) {
            next(error);
        }
    }
}
