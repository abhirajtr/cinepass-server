import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils";
import { comparePassword } from "../../utils/passwordUtils";


export class LoginAdminUseCase {
    constructor(
        private adminRepository: IAdminRepository,
    ) { }

    async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        if (!email || !password) {
            throw new UnauthorizedError("Email and password are required");
        }
        email = email.trim().toLowerCase();

        const user = await this.adminRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found. Please check the email address");
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) throw new UnauthorizedError("Invalid password. Please try again");

        if (user.isBlocked) throw new ForbiddenError("Your account has been blocked. Please contact support");

        const accessToken = generateAccessToken({ email: user.email, userId: user.userId, role: "admin" });
        const refreshToken = generateRefreshToken({ email: user.email, userId: user.userId, role: "admin" });
        return { accessToken, refreshToken }
    }
}