import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { createApiResponse } from "../../infrastructure/http/common-response";

export class UserController {

    private signupUserUseCase = DIContainer.getSignupUserUseCase();
    private loginUserUseCase = DIContainer.getLoginUserUseCase();
    private forgotPasswordUserUseCase = DIContainer.getForgotPasswordUserUseCase();
    private getAllUsersAdminUseCase = DIContainer.getGetAllUsersAdminUseCase();
    private toggleBlockUserAdminUseCase = DIContainer.getToggleBlockUserAdminUseCase();

    async signup(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, phoneNumber, password, confirmPassword } = req.body;
            console.log(email, password, phoneNumber);
            await this.signupUserUseCase.execute(email, phoneNumber, confirmPassword);
            res.status(200).json({
                message: 'User registered successfully. Please verify the OTP sent to your email.'
            });
        } catch (error) {
            next(error);
        }
    }
    async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.signupUserUseCase.resendOtp(email);
            res.status(200).json({ message: "A new OTP has been sent. Please verify your email address" });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            console.log(email, otp);

            await this.signupUserUseCase.verifyOtpAndSignup(email, otp);
            res.status(200).json({ message: "OTP verified successfully. You can now proceed to login" });
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUserUseCase.execute(email, password);
            res.status(200).json(createApiResponse({ accessToken }, 200, "Welcome back! You're now logged in"));
            res.cookie('refreshTokenUser', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: req.secure,
                path: '/',
            });
        } catch (error) {
            next(error);
        }
    }
    async forgotPasswordUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.forgotPasswordUserUseCase.sendPasswordResetEmail(email);
            res.status(200).json({
                message: "A password reset link has been sent to your email address. Please check your inbox",
            });
        } catch (error) {
            next(error);
        }
    }
    async resetPasswordUser(req: Request, res: Response, next: NextFunction) {
        const { token, newPassword } = req.body;
        console.log(newPassword);

        try {
            await this.forgotPasswordUserUseCase.resetPassword(token, newPassword);
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const { search } = req.query;
        const status = req.query.status as string;
        const searchTerm = (search as string) || "";
        const usersPerPage = Number(req.query.usersPerPage) || 10
        const currentPage = Number(req.query.currentPage) || 1
        try {
            const users = await this.getAllUsersAdminUseCase.execute(searchTerm, status, usersPerPage, currentPage);
            res.status(200).json(createApiResponse(users));
        } catch (error) {
            next(error);
        }
    }

    async toggleBlock(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { blockStatus } = req.body;
            console.log("userId:", req.body);
            const response = await this.toggleBlockUserAdminUseCase.execute(userId, blockStatus);
            res.status(200).json(createApiResponse());
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async refreshOnPageLoad(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(res.cookie);
            res.status(200).json({});
            // const refreshToken = 
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
}
