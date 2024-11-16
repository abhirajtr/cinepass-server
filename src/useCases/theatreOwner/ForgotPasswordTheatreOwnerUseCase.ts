import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { ITheatreOwnerRepository } from "../../domain/interfaces/ITheatreOwnerRepository";
import { sendEmail } from "../../utils/emailUtils";
import { generateResetToken, verifyResetToken } from "../../utils/jwtUtils";
import { hashPassword } from "../../utils/passwordUtils";

export class ForgotPasswordTheatreOwnerUseCase {
    constructor(
        private theatreOwnerRepository: ITheatreOwnerRepository,
    ) { }

    async sendPasswordResetEmail(email: string) {
        const user = await this.theatreOwnerRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found. Please check the email address and try again");
        const resetToken = generateResetToken({
            email: user.email,
            userId: user.userId,
            role: "regularUser"
        });
        const resetLink = `http://localhost:4000/theatreOwner/reset-password?token=${resetToken}`;
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
        await this.theatreOwnerRepository.updateById(decodedUser.userId, { password: hashedPassword });
    }
}