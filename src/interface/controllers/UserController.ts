import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middlewares/jwtAuthMiddleware";
import { UnprocessableEntityError } from "../../domain/errors/UnprocessableEntityError";

export class UserController {
    private signupUseCase = DIContainer.getUserSignupUseCase();
    private verifyAndSignupUseCase = DIContainer.getUserVerifyAndSignupUseCase();
    private resendOtpUseCase = DIContainer.getResendOtpUserUseCase();
    private loginUseCase = DIContainer.getLoginUserUseCase();
    private getUserDetailsUseCase = DIContainer.getGetUserDetailsUserUseCase();
    private refreshTokenUseCase = DIContainer.getRefreshTokenUseCase();
    private updateDetailsUseCase = DIContainer.getUpdateDetailsUserUseCase();
    private updatePasswordUseCase = DIContainer.getUpdatePasswordUserUseCase();
    private forgotPasswordUseCase = DIContainer.getForgotPasswordUserUseCase();
    private verifyOtpUseCase = DIContainer.getVerifyOtpUserUseCase();
    private resetPasswordUseCase = DIContainer.getResetPasswordUserUseCase();

    async signup(req: Request, res: Response, next: NextFunction) {
        const { email, phone, password } = req.body;
        try {
            await this.signupUseCase.execute(email, phone, password);
            res.status(200).json({ message: "success" });
        } catch (error) {
            next(error);
        }
    }

    async verifyAndSignup(req: Request, res: Response, next: NextFunction) {
        const { email, otp } = req.body;
        console.log('email and otp for verify:', email, otp);

        try {
            await this.verifyAndSignupUseCase.execute(email, otp);
            res.status(201).json({ message: 'OTP verified successfully' });
        } catch (error) {
            next(error);
        }
    }

    async ResendOtp(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        console.log('Received email for resend otp:', email);
        try {
            await this.resendOtpUseCase.execute(email);
            res.status(200).json({ message: 'Resend otp success' });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax', secure: false, path: "/" });
            res.status(200).json({ accessToken, message: 'Login success' });
        } catch (error) {
            next(error);
        }
    }

    async profile(req: CustomRequest, res: Response, next: NextFunction) {
        const { userId } = req;
        try {
            const userDetails = await this.getUserDetailsUseCase.execute(userId!);
            res.status(200).json(userDetails);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        console.log('cookie', req.cookies);
        const { refreshToken } = req.cookies;
        console.log(refreshToken);
        if (!refreshToken) {
            return next(new Error('Refresh token is missing'));
        }
        try {
            const accessToken = await this.refreshTokenUseCase.execute(refreshToken);
            res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }

    async updateDetails(req: CustomRequest, res: Response, next: NextFunction) {
        const { userId } = req;
        const { phone: oldPhone, username: oldUsername } = req.body;
        try {
            const updatedData = await this.updateDetailsUseCase.execute(userId!, oldPhone, oldUsername);
            res.status(200).json({ message: "updated success", updatedData });
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req: CustomRequest, res: Response, next: NextFunction) {
        const { userId } = req;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        console.log(oldPassword, newPassword, confirmPassword);

        try {
            if (!oldPassword || oldPassword.length < 8) {
                throw new UnprocessableEntityError("Old password must be at least 8 characters long.");
            }
            if (!newPassword || newPassword.length < 8) {
                throw new UnprocessableEntityError("New password must be at least 8 characters long.");
            }
            if (newPassword !== confirmPassword) {
                throw new UnprocessableEntityError("New password and confirmation password do not match.");
            }
            if (oldPassword === newPassword) {
                throw new UnprocessableEntityError("New password cannot be the same as the old password.");
            }
            await this.updatePasswordUseCase.execute(userId!, oldPassword, newPassword);
            res.status(200).json({ message: 'Password updated success' });
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        try {
            if (!email) {
                throw new UnprocessableEntityError('Email is required');
            }
            await this.forgotPasswordUseCase.execute(email);
            res.status(200).json({ message: "An OTP has been sent to your email. Please check your inbox." });
        } catch (error) {
            next(error);
        }
    }

    async forgotPasswordVerfiyOtp(req: Request, res: Response, next: NextFunction) {
        const { email, otp } = req.body;
        try {
            if (!email || !otp) {
                throw new UnprocessableEntityError('email and otp is required');
            }
            await this.verifyOtpUseCase.execute(email, otp);
            res.status(200).json({ message: "OTP verified success" });
        } catch (error) {
            next(error);
        }
    }
    async resetUserPassword(req: Request, res: Response, next: NextFunction) {
        const { email, password, confirmPassword } = req.body;
        console.log('fields:', email, password, confirmPassword);
        try {
            if (!email || !password || !confirmPassword) {
                throw new UnprocessableEntityError('Email, password, and confirmPassword are required');
            }
            if (password.length < 8) {
                throw new UnprocessableEntityError('Password must be at least 8 characters long');
            }
            if (password !== confirmPassword) {
                throw new UnprocessableEntityError('Password and confirmPassword do not match');
            }
            await this.resetPasswordUseCase.execute(email, password);
            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error);
        }
    }

}