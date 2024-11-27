import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwtUtils";
import { createApiResponse } from "../../infrastructure/http/common-response";

export class AdminController {

    private loginUseCase = DIContainer.getLoginAdminUseCase();

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
            res.status(200).json(createApiResponse({ accessToken }, 200, "Welcome back! You're now logged in"));
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
            res.status(200).json({ accessToken: accessToken });
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
            res.status(200).json(createApiResponse(null, 200, "Admin logged out successfully"));
        } catch (error) {
            next(error);
        }
    }
}