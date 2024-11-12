import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UserRole } from "../../domain/entities/User";

export class AdminController {
    private getAllUsersByTypeUseCase = DIContainer.getAllUsersByTypeUseCase();
    private blockUnblockUserByTypeUseCase = DIContainer.getBlockUnblockUserByTypeUseCase();

    async getAllUsersByType(req: Request, res: Response, next: NextFunction, role: UserRole) {
        try {
            const { search = "", isBlocked = "", userRole = "" } = req.query;
            const { users, totalCount } = await this.getAllUsersByTypeUseCase.execute(search as string, isBlocked as boolean | "", userRole as UserRole);
            res.status(200).json({ users, totalCount });
        } catch (error) {
            next(error);
        }
    }

    async blockUnblockUserByType(req: Request, res: Response, next: NextFunction, role: UserRole) {
        try {
            const { userId, isBlocked } = req.body;
            const updatedUser = await this.blockUnblockUserByTypeUseCase.execute(userId, isBlocked, "regularUser");
            // console.log(`Request received for block user with id ${userId}`);

            const action = isBlocked ? 'blocked' : 'unblocked';
            const message = `The user has been ${action} successfully.`;
            res.status(200).json({ message, updatedUser });
        } catch (error) {
            next(error);
        }
    }
}