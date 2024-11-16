import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { sendEmail } from "../../utils/emailUtils";
import { generateResetToken, verifyResetToken } from "../../utils/jwtUtils";
import { hashPassword } from "../../utils/passwordUtils";

export class ForgotPasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async sendPasswordResetEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found. Please check the email address and try again");
        const resetToken = generateResetToken({
            email: user.email,
            userId: user.userId,
            role: "regularUser"
        });
        const resetLink = `http://localhost:4000/reset-password?token=${resetToken}`;
        const htmlContent = `
            <p>Hi User,</p>
            <p>Click the link below to reset your password:</p>
            <a href=${resetLink}>reset</a>
            <p>This link will expire in 5 minutes.</p>`
        await sendEmail(user.email, "Reset Your Password", htmlContent)
    }
    async resetPassword(token: string, newPassword: string) {
        const decodedUser = verifyResetToken(token);
        if (!decodedUser) throw new UnauthorizedError("Your reset link is invalid or has expired. Please request a new one");
        const hashedPassword = await hashPassword(newPassword);
        await this.userRepository.updateById(decodedUser.userId, { password: hashedPassword });
    }
}