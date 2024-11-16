import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";

export class AdminController {

    private loginUseCase = DIContainer.getLoginAdminUseCase();

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.status(200).json({
                message: "Login successful.",
                accessToken
            });
        } catch (error) {
            next(error);
        }
    }
}


// import { Request, Response, NextFunction } from "express";
// import { DIContainer } from "../../infrastructure/DIContainer";
// import { UserRole } from "../../domain/entities/User";
// import { CustomRequest } from "../middleware/jwtMiddleware";

// export class AdminController {
//     private getAllUsersByTypeUseCase = DIContainer.getAllUsersByTypeUseCase();
//     private blockUnblockUserByTypeUseCase = DIContainer.getBlockUnblockUserByTypeUseCase();
//     private getTheatresUseCase = DIContainer.getTheatresUseCase();

//     async getAllUsersByType(req: Request, res: Response, next: NextFunction, role: UserRole) {
//         try {
//             const { search = "", isBlocked = "", userRole = "", limit = 10, currentPage = 1 } = req.query;
//             const skip = (Number(currentPage) - 1) * Number(limit);
//             const { users, totalCount } = await this.getAllUsersByTypeUseCase.execute(search as string, isBlocked as boolean | "", userRole as UserRole, skip, Number(limit));
//             res.status(200).json({ users, totalCount });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async blockUnblockUserByType(req: Request, res: Response, next: NextFunction, role: UserRole) {
//         try {
//             const { userId, isBlocked } = req.body;
//             console.log(userId, isBlocked);
            
//             const updatedUser = await this.blockUnblockUserByTypeUseCase.execute(userId, isBlocked, "regularUser");
//             // console.log(`Request received for block user with id ${userId}`);

//             const action = isBlocked ? 'blocked' : 'unblocked';
//             const message = `The user has been ${action} successfully.`;
//             res.status(200).json({ message, updatedUser });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async getTheatres(req: Request, res: Response, next: NextFunction) {        
//         try {
//             const { searchTerm, verified, sort, currentPage, limit } = req.query;
//             console.log(req.query);
            
    
//             if (!currentPage || !limit) {
//                 res.status(400).json({ error: "Pagination parameters 'skip' and 'limit' are required." });
//                 return
//             }
            

//             // const skip = parseInt(currentPage as string, 10);
//             // const limitNumber = parseInt(limit as string, 10);
    
//             // const params = {
//             //     searchTerm: searchTerm ? (searchTerm as string) : '',
//             //     filter: filter ? JSON.parse(filter as string) : {},
//             //     sort: sort ? (sort as string) : 'theatreName',
//             //     skip: skip,
//             //     limit: limitNumber,
//             // };
            
            
//             const theatres = await this.getTheatresUseCase.execute(searchTerm as string, verified as string,"", Number(currentPage), Number(limit));
    
//             res.status(200).json({
//                 success: true,
//                 theatres,
//             });
//         } catch (error) {
//             console.error(error);
//             next(error);
//         }
//     }

// }