import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CustomRequest } from "../middlewares/jwtAuthMiddleware";

export class UserController {
    private signupUseCase = DIContainer.getUserSignupUseCase();
    private verifyAndSignupUseCase = DIContainer.getUserVerifyAndSignupUseCase();
    private resendOtpUseCase = DIContainer.getResendOtpUserUseCase();
    private loginUseCase = DIContainer.getLoginUserUseCase();
    private getUserDetailsUseCase = DIContainer.getGetUserDetailsUserUseCase();
    private refreshTokenUseCase = DIContainer.getRefreshTokenUseCase();

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
}