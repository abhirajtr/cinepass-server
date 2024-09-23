import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { UnprocessableEntityError } from "../../domain/errors/UnprocessableEntityError";

export class AdminController {
    private loginUseCase = DIContainer.getLoginAdminUseCase();

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                throw new UnprocessableEntityError('Email and Password are required');
            }
            const { accessToken, refreshToken } = await this.loginUseCase.execute(email, password);
            res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax', secure: false, path: "/" });
            res.status(200).json({ accessToken, message: 'Login success' });
        } catch (error) {
            next(error);
        }
    }
}