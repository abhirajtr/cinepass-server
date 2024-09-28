import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { ITokenService } from "../../domain/interfaces/ITokenService";


export class LoginTheatreUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
        private passwordHashingService: IPasswordHashingService,
        private tokenService: ITokenService,
    ) { }

    async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const theatre = await this.theatreRepository.findTheatreByEmail(email);
        if (!theatre) {
            throw new NotFoundError('Theatre account not found');
        }
        if (!theatre.isApproved) {
            throw new UnauthorizedError('Your account is pending approval by the admin.');
        }
        if (theatre.isBlocked) {
            throw new UnauthorizedError('Your account has been blocked. Please contact support.');
        }
        const isPasswordValid = await this.passwordHashingService.comparePassword(password, theatre.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Incorrect password. Please try again.');
        }
        const accessToken = this.tokenService.generateAccessToken(theatre.theatreId, theatre.email, "theatre");
        const refreshToken = this.tokenService.generateRefreshToken(theatre.theatreId, theatre.email, "theatre");
        return { accessToken, refreshToken };
    }
}