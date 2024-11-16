import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";

export class TheatreOwnerController {

    private signupUseCase = DIContainer.getSignupTheatreOwnerUseCase();
    private loginUseCase = DIContainer.getLoginTheatreOwnerUseCase();
    private forgotPasswordUseCase = DIContainer.getForgotPasswordTheatreOwnerUseCase();

    async signup(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, password, confirmPassword, phoneNumebr } = req.body;
            await this.signupUseCase.execute(email, phoneNumebr, password);
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
            await this.signupUseCase.resendOtp(email);
            res.status(200).json({ message: "A new OTP has been sent. Please verify your email address" });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            console.log(email, otp);

            await this.signupUseCase.verifyOtpAndSignup(email, otp);
            res.status(200).json({ message: "OTP verified successfully. You can now proceed to login" });
        } catch (error) {
            next(error);
        }
    }
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

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.forgotPasswordUseCase.sendPasswordResetEmail(email);
            res.status(200).json({
                message: "A password reset link has been sent to your email address. Please check your inbox",
            });
        } catch (error) {
            next(error);
        }
    }
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        const { token, newPassword } = req.body;
        console.log(newPassword);

        try {
            await this.forgotPasswordUseCase.resetPassword(token, newPassword);
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            next(error);
        }
    }
}



// import { NextFunction, Request, Response } from "express";
// import { DIContainer } from "../../infrastructure/DIContainer";
// import { CustomRequest } from "../middleware/jwtMiddleware";


// export class TheatreOwnerController {

//     private addTheatreUseCase = DIContainer.getAddTheatreUseCase();
//     private listTheatresByOwnerUseCase = DIContainer.getListTheatreByOwnerUseCase();

//     async addTheatre(req: CustomRequest, res: Response, next: NextFunction) {
//         try {
//             console.log(req.file?.filename);
//             const { ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode } = req.body;
//             console.log(
//                 ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode
//             );
//             const verificationDocument = req.file?.filename as string
//             await this.addTheatreUseCase.addTheatre({ ownerId, theatreName, contactEmail, phoneNumber, streetAddress, city, state, zipCode, verificationDocument });
//             res.status(200).json({ message: 'success' });
//         } catch (error) {
//             next(error);
//             console.log(error);
//         }
//     }

//     async getTheatres(req: CustomRequest, res: Response, next: NextFunction) {
//         try {
//             const { userId } = req;
//             const theatres = await this.listTheatresByOwnerUseCase.execute(userId!);
//             res.status(200).json({ theatres })
//         } catch (error) {
//             next(error);
//         }
//     }
// }
