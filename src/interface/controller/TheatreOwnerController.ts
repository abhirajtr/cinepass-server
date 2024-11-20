import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middleware/jwtMiddleware";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwtUtils";
import { createApiResponse } from "../../infrastructure/http/common-response";

export class TheatreOwnerController {

    private signupUseCase = DIContainer.getSignupTheatreOwnerUseCase();
    private loginUseCase = DIContainer.getLoginTheatreOwnerUseCase();
    private forgotPasswordUseCase = DIContainer.getForgotPasswordTheatreOwnerUseCase();
    private getAllTheatreOwnersAdminUseCase = DIContainer.getGetAllTheatreOwnersAdminUseCase();
    private toggleBlockTheatreOwnerAdminUseCase = DIContainer.getToggleBlockTheatreOwnerAdminUseCase();

    async signup(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, password, confirmPassword, phoneNumeber } = req.body;
            console.log("signup", email, password, confirmPassword, phoneNumeber);

            await this.signupUseCase.execute(email, phoneNumeber, password);
            res.status(200).json(createApiResponse(null, 200, "User registered successfully. Please verify the OTP sent to your email"));
        } catch (error) {
            next(error);
        }
    }
    async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.signupUseCase.resendOtp(email);
            res.status(200).json(createApiResponse(null, 200, "A new OTP has been sent. Please verify your email address"));
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            console.log(email, otp);
            await this.signupUseCase.verifyOtpAndSignup(email, otp);
            res.status(200).json(createApiResponse(null, 200, "OTP verified successfully. You can now proceed to login"));
        } catch (error) {
            next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.cookie('refreshTokenTheatreOwner', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: 'lax',
                path: '/theatreOwner',
            });
            res.status(200).json(createApiResponse({ accessToken }, 200, "Login successful"));
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.forgotPasswordUseCase.sendPasswordResetEmail(email);
            res.status(200).json(createApiResponse(null, 200, "A password reset link has been sent to your email address. Please check your inbox"));
        } catch (error) {
            next(error);
        }
    }
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        const { token, newPassword } = req.body;
        try {
            await this.forgotPasswordUseCase.resetPassword(token, newPassword);
            res.status(200).json(createApiResponse(null, 200, "Password reset successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getAllTheatreOwners(req: Request, res: Response, next: NextFunction) {
        // console.log(req.query);
        const { search } = req.query;
        const status = req.query.status as string;
        const searchTerm = (search as string) || "";
        const usersPerPage = Number(req.query.usersPerPage) || 10
        const currentPage = Number(req.query.currentPage) || 1
        try {
            const theatreOwners = await this.getAllTheatreOwnersAdminUseCase.execute(searchTerm, status, usersPerPage, currentPage);
            res.status(200).json(createApiResponse(theatreOwners));
        } catch (error) {
            next(error);
        }
    }

    async toggleBlock(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { blockStatus } = req.body;
            console.log("userId:", req.body);
            await this.toggleBlockTheatreOwnerAdminUseCase.execute(userId, blockStatus);
            res.status(200).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async refreshOnPageLoad(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("refresh-route-theatreOwner:", req.cookies.refreshTokenTheatreOwner);
            const refreshTokenTheatreOwner = req.cookies?.refreshTokenTheatreOwner;
            if (!refreshTokenTheatreOwner) {
                throw new UnauthorizedError("No refresh token");
            }
            const decoded = verifyRefreshToken(refreshTokenTheatreOwner);

            if (!decoded) {
                throw new UnauthorizedError("token expired or invalid");
            }
            const accessToken = generateAccessToken({ userId: decoded.userId, email: decoded.email, role: decoded.role });
            console.log(accessToken);
            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshTokenTheatreOwner', {
                httpOnly: true,
                secure: false, // Match original attributes
                sameSite: 'lax', // Or None if cross-origin
                path: '/theatreOwner', // Ensure it matches
            });
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            next(error);
        }
    }
}