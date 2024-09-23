import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { generateUserId } from "../../utils/idGenerator";

export class LoginAdminUseCase {
    constructor(
        private adminRepository: IAdminRepository,
        private passwordHashingService: IPasswordHashingService,
        private tokenService: ITokenService,
    ) { }

    async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const admin = await this.adminRepository.findAdminByEmail(email);
        if (!admin) {
            throw new NotFoundError('admin not found');
        }

        const isPasswordMatch = await this.passwordHashingService.comparePassword(password, admin.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('Invalid password');
        }
        const accessToken = this.tokenService.generateAccessToken(admin.adminId, admin.email, "admin");
        const refreshToken = this.tokenService.generateRefreshToken(admin.adminId, admin.email, "admin");
        return { accessToken, refreshToken }
    }
}