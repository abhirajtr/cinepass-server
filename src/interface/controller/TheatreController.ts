import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middleware/jwtMiddleware";
import { createApiErrorResponse, createApiResponse } from "../../infrastructure/http/common-response";
import { generateUserId } from "../../utils/uuidUtils";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { CreateTheatreDto } from "../../domain/dtos/CreateTheatreDto";
import { validate } from "class-validator";
import { CreateScreenTheatreOwnerUseCase } from "../../useCases/theatreOwner/createScreenTheatreOwnerUseCase";
import { GetAllScreensTheatreOwnerUseCase } from "../../useCases/theatreOwner/GetAllScreensTheatreOwnerUseCase";
import { CreateShowUseCase } from "../../useCases/theatreOwner/createShowUseCase";
import { GetAllShowsByScreenUseCase } from "../../useCases/theatreOwner/GetAllShowsByScreenUseCase";
import { HttpStatusCode } from "axios";
import { uuidRegex } from "../validators/uuidRegex";
import { GetTheatresUseCase } from "../../useCases/User/GetTheatresUseCase";



export class TheatreController {
    private addTheatreTheatreOwnerUseCase = DIContainer.getAddTheatreTheatreOwnerUseCase();
    private getAllTheatresTheatreOwnerUseCase = DIContainer.getAllTheatresTheatreOwnerUseCase();
    private getAllTheatresAdminUseCase = DIContainer.getGetAllTheatresAdminUseCase();
    private getGetTheatreDocumentUrlAdminUseCase = DIContainer.getGetTheatreDocumnetUrlAdminUseCase();
    private verifyTheatreAdminUseCase = DIContainer.getVerifyTheatreAdminUseCase();
    private rejectTheatreAdminUseCase = DIContainer.getRejectTheatreAdminUseCase();
    private getTheatreDetailsTheatreOwnerUseCase = DIContainer.getGetTheatreDetailsTheatreOwnerUseCase();
    private editTheatreTheatreOwnerUseCase = DIContainer.getEditTheatreTheatreOwnerUseCase();
    private createScreen = new CreateScreenTheatreOwnerUseCase(DIContainer.getScreenRepository());
    private getAllScreensUseCaseTheatreOwnerUseCase = new GetAllScreensTheatreOwnerUseCase(DIContainer.getScreenRepository());
    private createShowUseCase = new CreateShowUseCase(DIContainer.getShowRepository(), DIContainer.getScreenRepository());
    private getAllShowsByScreenUseCase = new GetAllShowsByScreenUseCase(DIContainer.getShowRepository());
    private getTheatresUseCase = new GetTheatresUseCase(DIContainer.getTheatreRepository());

    async addTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            console.log("Received data for adding a theatre:", req.body);
            console.log("Uploaded file details:", req.file);
            const userId = req.userId;
            const createTheatreDto = Object.assign(new CreateTheatreDto(), req.body);
            const errors = await validate(createTheatreDto);
            if (errors.length > 0) {
                const errorMessages = errors.flatMap(error => {
                    return Object.values(error.constraints || {});
                });
                res.status(HttpStatusCode.BadRequest).json(createApiErrorResponse(errorMessages, 400, "Validation failed"));
                return;
            }
            const { name, email, phone, address, city, state, zipCode, licenseNumber, latitude, longitude } = createTheatreDto;
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
                latitude,
                longitude,
            };
            const { presignedUrl } = await this.addTheatreTheatreOwnerUseCase.execute(theatre);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ presignedUrl }, 200, "Theatre added successfully"));
        } catch (error) {
            next(error);
        }
    }
    async editTheatre(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            console.log("Received data for adding a theatre:", req.body);
            console.log("Uploaded file details:", req.file);
            const userId = req.userId;
            const { theatreId } = req.params;
            const { name, email, phone, address, city, state, zipCode, licenseNumber, longitude, latitude } = req.body;
            const theatre = {
                theatreId,
                name,
                email,
                phone,
                address,
                city,
                state,
                zipCode,
                ownerId: userId!,
                licenseNumber,
                latitude,
                longitude,
            };
            const presignedUrl = await this.editTheatreTheatreOwnerUseCase.execute(theatre);
            res.status(HttpStatusCode.Ok).json(createApiResponse(presignedUrl, 200, "Theatre updated successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatres(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const theatres = await this.getAllTheatresTheatreOwnerUseCase.execute(userId!);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ theatres }))
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatresAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            let { searchTerm, status } = req.query;
            if (typeof searchTerm !== 'string') {
                searchTerm = "";
            }
            if (typeof status !== 'string') {
                status = "all"
            }
            const theatres = await this.getAllTheatresAdminUseCase.execute(searchTerm, status);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ theatres }, 200));
        } catch (error) {
            next(error);
        }
    }

    async getDocumentUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName } = req.query;
            const documentUrl = await this.getGetTheatreDocumentUrlAdminUseCase.execute(fileName as string);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ documentUrl }));
        } catch (error) {
            next(error);
        }
    }

    async verifyTheatre(req: Request, res: Response, next: NextFunction) {
        try {
            const { theatreId } = req.params;
            if (!theatreId || typeof theatreId !== 'string') {
                throw new BadRequestError("theatreId is missing or invalid");
            }
            await this.verifyTheatreAdminUseCase.execute(theatreId);
            res.status(HttpStatusCode.Ok).json(createApiResponse());
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async rejectTheatre(req: Request, res: Response, next: NextFunction) {
        try {
            const { theatreId } = req.params;
            const { reason } = req.body;
            if (!reason || typeof reason !== 'string') {
                throw new BadRequestError("reason is missing or invalid");
            }
            if (!theatreId || typeof theatreId !== 'string') {
                throw new BadRequestError("theatreId is missing or invalid");
            }
            await this.rejectTheatreAdminUseCase.execute(theatreId, reason);
            res.status(HttpStatusCode.Ok).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async getTheatreDetailsTheatreOwner(req: Request, res: Response, next: NextFunction) {
        try {
            const { theatreId } = req.params;
            const theatre = await this.getTheatreDetailsTheatreOwnerUseCase.execute(theatreId);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ theatre }));
        } catch (error) {
            next(error);
        }
    }

    async updateTheatreTheatreOwner(req: Request, res: Response, next: NextFunction) {
        try {
            const { theatreId } = req.params;
        } catch (error) {
            next(error);
        }
    }

    async addScreen(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('r==========>');

            console.log(req.body);
            const { theatreId, screenName, seats, capacity } = req.body;
            await this.createScreen.execute(theatreId, screenName, seats, capacity);
            res.status(HttpStatusCode.Ok).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async getAllScreens(req: Request, res: Response, next: NextFunction) {
        try {
            const { theatreId } = req.params;
            if (!theatreId) {
                res.status(HttpStatusCode.BadRequest).json(createApiErrorResponse(["theatreId required"], 400, "theatreId required"));
            }
            const screens = await this.getAllScreensUseCaseTheatreOwnerUseCase.execute(theatreId);
            console.log(screens);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ screens }));
        } catch (error) {
            next(error);
        }
    }

    async addShow(req: Request, res: Response, next: NextFunction) {
        try {
            const { movieId, movieTitle, screenId, theatreId, startTime } = req.body;
            console.log(req.body);
            // const startTime = new Date(startTime);

            const newShow = await this.createShowUseCase.execute(theatreId, screenId, movieId, movieTitle, startTime);
            res.status(HttpStatusCode.Ok).json(createApiResponse({ show: newShow }));
        } catch (error) {
            next(error);
        }
    }

    async getAllShowsByScreen(req: Request, res: Response, next: NextFunction) {
        try {
            const { screenId } = req.params;
            const { search, date } = req.query;
            if (!uuidRegex.test(screenId)) {
                res.status(400).json(createApiErrorResponse(["Invalid screenId format. Must be a valid UUID"]));
                return
            }
            if (search && typeof search !== 'string') {
                res.status(400).json(createApiErrorResponse(["Search should be a string"]));
                return
            }
            if (date && typeof date === 'string' && isNaN(Date.parse(date))) {
                res.status(400).json(createApiResponse(["Invalid date format. Use ISO 8601 format"]));
                return
            }
            const shows = await this.getAllShowsByScreenUseCase.execute({
                screenId, search, date: typeof date === 'string' ? date : undefined
            });
            res.status(HttpStatusCode.Ok).json(createApiResponse({ shows }));
        } catch (error) {
            next(error);
        }
    }

    async getTheatres(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;
            if (typeof search !== 'string') {
                res.status(HttpStatusCode.BadRequest).json(createApiErrorResponse(["Search term is required and must be a string"]));
                return
            }
            const theatres = await this.getTheatresUseCase.execute(search);            
            res.status(HttpStatusCode.Accepted).json(createApiResponse(theatres));
        } catch (error) {
            next(error);
        }
    }
}