import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";

export class UserController {

    private signupUserUseCase = DIContainer.getSignupUserUseCase();
    private loginUserUseCase = DIContainer.getLoginUserUseCase();
    private forgotPasswordUserUseCase = DIContainer.getForgotPasswordUserUseCase();
    private getAllUsersAdminUseCase = DIContainer.getGetAllUsersAdminUseCase();
    private toggleBlockUserAdminUseCase = DIContainer.getToggleBlockUserAdminUseCase();

    async singup(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, phoneNumeber, password, confirmPassword } = req.body;
            console.log(email, password, phoneNumeber);
            await this.signupUserUseCase.execute(email, phoneNumeber, confirmPassword);
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
            const { email, phoneNumber, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUserUseCase.execute(email, password);
            res.status(200).json({
                message: "Login successful.",
                accessToken
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
        console.log(req.query);
        const { search } = req.query;
        const status = req.query.status as string;
        const searchTerm = (search as string) || "";
        const usersPerPage = Number(req.query.usersPerPage) || 5
        const currentPage = Number(req.query.currentPage) || 1
        try {
            const response = await this.getAllUsersAdminUseCase.execute(searchTerm, status, usersPerPage, currentPage);
            res.status(200).json(response);
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
            res.status(200).json({ message: 'success' });
        } catch (error) {

        }
    }
}
