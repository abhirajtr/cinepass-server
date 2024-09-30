import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UnprocessableEntityError } from "../../domain/errors/UnprocessableEntityError";

export class AdminController {
    private loginUseCase = DIContainer.getLoginAdminUseCase();
    private getAllUsersUseCase = DIContainer.getAllUsersAdminUseCase();
    private blockUserUseCase = DIContainer.getBlockUserAdminUseCase();
    private getAllTheatresUseCase = DIContainer.getGetAllTheatresUseCase();
    private approveTheatreUseCase = DIContainer.getApproveTheatreUseCase();
    private blockUnblockTheatreUseCase = DIContainer.getBlockUnblockTheatreUseCase();

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                throw new UnprocessableEntityError('Email and Password are required');
            }
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax', secure: false, path: "/" });
            res.status(200).json({ accessToken, message: 'Login success' });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, limit = 10, searchTerm = '' } = req.query;
            const { users, totalPages } = await this.getAllUsersUseCase.execute(Number(page), Number(limit), searchTerm.toString());
            res.status(200).json({ users, totalPages });
        } catch (error) {
            next(error);
        }
    }
    async blockUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;
        const { isBlocked } = req.body;
        console.log(userId, isBlocked);

        try {
            if (!userId || (typeof isBlocked !== 'boolean')) {
                throw new UnprocessableEntityError('Invalid inputs');
            }
            await this.blockUserUseCase.execute(userId, isBlocked);
            res.status(200).json({ message: 'Success' });
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatres(req: Request, res: Response, next: NextFunction) {
        const { page = 1, limit = 10, searchTerm = '' } = req.query;
        try {
            const { theatres, totalTheatres } = await this.getAllTheatresUseCase.execute(Number(page), Number(limit), searchTerm.toString());
            // console.log(theatres);

            res.status(200).json({ theatres, totalTheatres });
        } catch (error) {
            next(error);
        }
    }

    async approveTheatre(req: Request, res: Response, next: NextFunction) {
        const { theatreId } = req.body;
        try {
            const updatedTheatre = await this.approveTheatreUseCase.execute(theatreId);
            res.status(200).json({ message: 'success', updatedTheatre });
        } catch (error) {
            next(error);
        }
    }


    async blockUnblockTheatre(req: Request, res: Response, next: NextFunction) {
        const { theatreId, isBlocked } = req.body;
        try {
            const updatedTheatre = await this.blockUnblockTheatreUseCase.execute(theatreId, isBlocked);            
            res.status(200).json({ updatedTheatre, message: 'success' });
        } catch (error) {
            next(error);
        }
    }
}