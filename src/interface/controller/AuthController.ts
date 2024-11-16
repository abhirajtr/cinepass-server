// import { NextFunction, Request, Response } from "express";
// import { DIContainer } from "../../infrastructure/DIContainer";
// import { logger } from "../../infrastructure/logger";
// import { UserRole } from "../../domain/entities/User";

// export class AuthController {

//     private signupUser = DIContainer.getSignupUserUseCase();
//     private loginUser = DIContainer.getLoginUserUseCase();
//     private forgotPasswordUser = DIContainer.getForgotPasswordUserUseCase();
//     private forgotPasswordUserUseCase = DIContainer.getForgotPasswordUserUseCase1();


//     async forgotPasswordUser1(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email } = req.body;
//             await this.forgotPasswordUserUseCase.execute(email);
//             res.status(200).json({ message: "A password reset link has been sent to your email address" });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async signup(req: Request, res: Response, next: NextFunction, role: UserRole) {
//         try {
//             const { email, phone, password, confirmPassword } = req.body;
//             await this.signupUser.execute(email, phone, password, role);
//             res.status(200).json({ message: 'Signup successful. Please check your email to verify your OTP.' });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async verifyOtp(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email, otp } = req.body;
//             await this.signupUser.verifyOtpAndSignup(email, otp);
//             res.status(200).json({ message: 'OTP verified successfully. You are now registered.' })
//         } catch (error) {
//             next(error);
//         }
//     }

//     async login(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email, password } = req.body;
//             const { accessToken, refreshToken } = await this.loginUser.execute(email, password);
//             res.cookie("refreshToken", refreshToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production", // Cookie is only sent over HTTPS in production
//                 sameSite: "strict", // Prevents CSRF by only allowing cookies on same-site requests
//                 maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time, e.g., 7 days
//             });
//             res.status(200).json({ message: "Login successful.", accessToken, });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email } = req.body;
//             await this.forgotPasswordUser.initiatePasswordReset(email);
//             res.status(200).json({ message: "An OTP has been sent to your email for password reset." });
//         } catch (error) {
//             next(error);
//         }
//     }
//     async verifyPasswordResetOtp(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email, otp } = req.body;
//             await this.forgotPasswordUser.verifyOtp(email, otp);
//             res.status(200).json({ message: "OTP verified successfully" });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async resendPasswordResetOtp(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email } = req.body;
//             await this.forgotPasswordUser.resendOtp(email);
//             res.status(200).json({ message: "OTP has been resent successfully." });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async resetPassword(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email, password } = req.body;
//             await this.forgotPasswordUser.updatePassword(email, password);
//             res.status(200).json({ message: "Your password has been reset successfully." });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async resendSignupOtp(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email } = req.body;
//             await this.signupUser.resendOtp(email);
//             res.status(200).json({ message: "OTP has been resent successfully." });
//         } catch (error) {
//             next(error);
//         }
//     }
// }