import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middleware/jwtMiddleware";
import { createApiErrorResponse, createApiResponse } from "../../infrastructure/http/common-response";
import { generateUserId } from "../../utils/uuidUtils";



export class TheatreController {
    private addTheatreTheatreOwnerUseCase = DIContainer.getAddTheatreTheatreOwnerUseCase();
    private getAllTheatresTheatreOwnerUseCase = DIContainer.getAllTheatresTheatreOwnerUseCase();
    private getAllTheatresAdminUseCase = DIContainer.getGetAllTheatresAdminUseCase();
    private getGetTheatreDocumentUrlAdminUseCase = DIContainer.getGetTheatreDocumnetUrlAdminUseCase();

    async addTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            console.log("Received data for adding a theatre:", req.body);
            console.log("Uploaded file details:", req.file);
            const userId = req.userId;
            const { name, email, phone, address, city, state, zipCode, licenseNumber } = req.body;
            // const verificationDocument = req.file?.fieldname
            // if (!verificationDocument) {
            //     res.status(400).json(createApiErrorResponse(["verification document required"], 400, "Verification document is required"))
            //     return;
            // }
            const theatre = {
                name,
                email,
                phone,
                address,
                city,
                state,
                zipCode,
                ownerId: userId!,
                licenseNumber,
            };
            const { presignedUrl, newTheatre } = await this.addTheatreTheatreOwnerUseCase.execute(theatre);
            res.status(200).json(createApiResponse({ presignedUrl }, 200, "Theatre added successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatres(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const theatres = await this.getAllTheatresTheatreOwnerUseCase.execute(userId!);
            res.status(200).json(createApiResponse({ theatres }))
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatresAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const theatres = await this.getAllTheatresAdminUseCase.execute();
            res.status(200).json(createApiResponse({ theatres }, 200));
        } catch (error) {
            next(error);
        }
    }

    async getDocumentUrl(req: Request, res: Response, next: NextFunction) {
        try {            
            const { fileName } = req.query;
            const documentUrl = await this.getGetTheatreDocumentUrlAdminUseCase.execute(fileName as string);
            res.status(200).json(createApiResponse({ documentUrl }));
        } catch (error) {
            next(error);
        }
    }
}