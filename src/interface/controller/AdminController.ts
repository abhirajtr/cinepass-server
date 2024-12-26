import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwtUtils";
import { createApiResponse } from "../../infrastructure/http/common-response";
import { HttpStatusCode } from "axios";
import { CalculateTotalRevenueUseCase } from "../../useCases/admin/CalculateTotalRevenueUseCase";

export class AdminController {

    private loginUseCase = DIContainer.getLoginAdminUseCase();
    private calculateTotalRevenueUseCase = new CalculateTotalRevenueUseCase(DIContainer.getBookingRepository());

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.cookie('refreshTokenAdmin', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: req.secure,
                path: '/',
            });
            res.status(HttpStatusCode.Ok).json(createApiResponse({ accessToken }, 200, "Welcome back! You're now logged in"));
        } catch (error) {
            next(error);
        }
    }
    async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("refresh-route:", req.cookies.refreshTokenAdmin);
            const refreshTokenAdmin = req.cookies?.refreshTokenAdmin;
            if (!refreshTokenAdmin) {
                throw new UnauthorizedError("No refresh token");
            }
            const decoded = verifyRefreshToken(refreshTokenAdmin);

            if (!decoded) {
                throw new UnauthorizedError("token expired or invalid");
            }
            const accessToken = generateAccessToken({ userId: decoded.userId, email: decoded.email, role: decoded.role });
            res.status(HttpStatusCode.Ok).json({ accessToken: accessToken });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie('refreshTokenAdmin', '', {
                httpOnly: true,
                maxAge: 0,
                path: '/',
                secure: req.secure,
            });
            res.status(HttpStatusCode.Ok).json(createApiResponse(null, 200, "Admin logged out successfully"));
        } catch (error) {
            next(error);
        }
    }
    async getTotalRevenue(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.calculateTotalRevenueUseCase.execute();
            
            res.status(200).json(createApiResponse(response));
        } catch (error) {
            next(error);
        }
    }
}