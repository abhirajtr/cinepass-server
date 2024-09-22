import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { ITokenService } from "../../domain/interfaces/ITokenService";

export class RefreshTokenUseCase {
    constructor(
        private tokenService: ITokenService,
    ) { }

    execute(refreshToken: string): string {
        const decodedData = this.tokenService.verifyRefreshToken(refreshToken);
        if (!decodedData) {
            throw new ForbiddenError('Inavlid refresh token');
        }
        const { userId, email, role } = decodedData;
        const newAccessToken = this.tokenService.generateAccessToken(userId, email, role);
        return newAccessToken;
    }
}