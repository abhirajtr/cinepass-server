import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHashingService: IPasswordHashingService,
        private tokenService: ITokenService,
    ) { }

    async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError('No user found with the provided email address.');
        }
        const isPasswordMatch = await this.passwordHashingService.comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('The password entered is incorrect. Please try again.');
        }
        if (user.isBlocked) {
            throw new ForbiddenError('Your account has been blocked. Please contact support for assistance.')
        }
        const accessToken = this.tokenService.generateAccessToken(user.userId, user.email, "user");
        const refreshToken = this.tokenService.generateRefreshToken(user.userId, user.email, "user");
        return { accessToken, refreshToken };
    }
}