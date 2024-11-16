import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils";
import { comparePassword } from "../../utils/passwordUtils";


export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found. Please check the email address");
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) throw new UnauthorizedError("Invalid password. Please try again");

        if (user.isBlocked) throw new ForbiddenError("Your account has been blocked. Please contact support");

        const accessToken = generateAccessToken({ email: user.email, userId: user.userId, role: "regularUser" });
        const refreshToken = generateRefreshToken({ email: user.email, userId: user.userId, role: "regularUser" });
        return { accessToken, refreshToken }
    }
}