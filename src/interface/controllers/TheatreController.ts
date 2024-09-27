import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UnprocessableEntityError } from "../../domain/errors/UnprocessableEntityError";

export class TheatreController {
    private theatreSignup = DIContainer.getSignupTheatreUseCase();

    async signup(req: Request, res: Response, next: NextFunction) {
        const { name, email, phone, location, password, confirmPassword } = req.body;
        try {
            if (!name || !email || !phone || !location || !password || !confirmPassword) {
                throw new UnprocessableEntityError('All fields are required.');
            }
            if (password.length < 8) {
                throw new UnprocessableEntityError('Password must be at least 8 characters long.');
            }
            if (password !== confirmPassword) {
                throw new UnprocessableEntityError('Passwords do not match.');
            }
            await this.theatreSignup.storeAndSendOtp(name, email, phone, location, password);
            res.status(200).json({ message: 'Signup successful! Please verify the OTP sent to your email to complete the registration process.' });
        } catch (error) {
            next(error);
        }
    }

    async signupVerifyOtp(req: Request, res: Response, next: NextFunction) {
        const { email, otp } = req.body;
        try {
            await this.theatreSignup.verifyOtpAndSave(email, otp);
            res.status(200).json({ message: 'OTP verified successfully. You are now registered as a theatre.' });
        } catch (error) {
            next(error);
        }
    }

    async signupResendOtp(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        try {
            await this.theatreSignup.ResendOtp(email);
            res.status(200).json({ message: 'OTP resend' });
        } catch (error) {
            next(error);
        }
    }
}