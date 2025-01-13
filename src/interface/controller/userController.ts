import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { createApiErrorResponse, createApiResponse } from "../../infrastructure/http/common-response";
import { SignupDto } from "../../domain/dtos/SignupDto";
import { validate } from "class-validator";
import { GetUserInfoUseCase } from "../../useCases/User/GetUserInfoUseCase";
import { CustomRequest } from "../middleware/jwtMiddleware";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { HttpStatusCode } from "../../infrastructure/http/HttpstatusCode";
import { UpdateUserNameUseCase } from "../../useCases/User/UpdateUserNameUseCase";
import { UpdatePasswordUseCase } from "../../useCases/User/UpdatePasswordUseCase";
import { GetWalletUseCase } from "../../useCases/User/GetWalletUseCase";

export class UserController {

    private signupUserUseCase = DIContainer.getSignupUserUseCase();
    private loginUserUseCase = DIContainer.getLoginUserUseCase();
    private forgotPasswordUserUseCase = DIContainer.getForgotPasswordUserUseCase();
    private getAllUsersAdminUseCase = DIContainer.getGetAllUsersAdminUseCase();
    private toggleBlockUserAdminUseCase = DIContainer.getToggleBlockUserAdminUseCase();
    private getUserInfoUseCase = new GetUserInfoUseCase(DIContainer.getUserRepository());
    private updateUserNameUseCase = new UpdateUserNameUseCase(DIContainer.getUserRepository());
    private updatePasswordUseCase = new UpdatePasswordUseCase(DIContainer.getUserRepository());
    private getWalletUseCase = new GetWalletUseCase(DIContainer.getWalletRepository());

    async signup(req: Request, res: Response, next: NextFunction) {

        try {
            const dto = Object.assign(new SignupDto(), req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                const errorMessages = errors.flatMap(error => {
                    return Object.values(error.constraints || {});
                });
                res.status(400).json(createApiErrorResponse(errorMessages, 400, "Validation failed"));
                return;
            }
            const { email, phoneNumber, password } = dto;
            await this.signupUserUseCase.execute(email, phoneNumber, password);
            res.status(HttpStatusCode.OK).json(createApiResponse(null, 200, "User registered successfully. Please verify the OTP sent to your email"));
        } catch (error) {
            next(error);
        }
    }
    async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.signupUserUseCase.resendOtp(email);
            res.status(HttpStatusCode.OK).json({ message: "A new OTP has been sent. Please verify your email address" });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            console.log(email, otp);

            await this.signupUserUseCase.verifyOtpAndSignup(email, otp);
            res.status(HttpStatusCode.OK).json({ message: "OTP verified successfully. You can now proceed to login" });
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginUserUseCase.execute(email, password);
            res.status(HttpStatusCode.OK).json(createApiResponse({ accessToken }, 200, "Welcome back! You're now logged in"));
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
            res.status(HttpStatusCode.OK).json({
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
            res.status(HttpStatusCode.OK).json({ message: "Password reset successfully" });
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
            res.status(HttpStatusCode.OK).json(createApiResponse());
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async refreshOnPageLoad(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(res.cookie);
            res.status(HttpStatusCode.OK).json({});
            // const refreshToken = 
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async getUserInfo(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            console.log(userId, "ss");

            if (!userId) {
                throw new BadRequestError("User ID is undefined");
            }
            const userInfo = await this.getUserInfoUseCase.execute(userId);
            console.log(userInfo);

            res.status(HttpStatusCode.OK).json(createApiResponse(userInfo));
        } catch (error) {
            next(error);
        }
    }
    async updateUserName(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            const { name } = req.body;
            if (!userId) {
                throw new BadRequestError("User ID is undefined");
            }
            if (!name) {
                throw new BadRequestError("name is undefined");
            }
            const user = await this.updateUserNameUseCase.execute(userId, name);
            res.status(HttpStatusCode.OK).json(createApiResponse(user));
        } catch (error) {
            next(error);
        }
    }
    async updatePassword(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            const { currentPassword, newPassword, confirmPassword } = req.body;
            if (!userId) {
                throw new BadRequestError("User ID is undefined");
            }
            if (!currentPassword || !newPassword || !confirmPassword) {
                res.status(400).json({ message: "All fields are required." });
                return
            }
            if (newPassword.length < 8 || confirmPassword.length < 8) {
                res
                    .status(400)
                    .json({ message: "Password must be at least 8 characters long." });
                return
            }
            if (newPassword !== confirmPassword) {
                res.status(400).json({ message: "Passwords do not match." });
                return
            }
            console.log(currentPassword);
            await this.updatePasswordUseCase.execute(userId, currentPassword, newPassword);
            res.status(HttpStatusCode.OK).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async getWallet(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            const wallet = await this.getWalletUseCase.execute(userId!);
            res.status(HttpStatusCode.OK).json(createApiResponse(wallet));
        } catch (error) {
            next(error);
        }
    }
}
