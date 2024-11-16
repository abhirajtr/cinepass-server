// import { NotFoundError } from "../domain/errors/NotFoundError";
// import { IUserRepository } from "../domain/interfaces/IUserRepository";
// import { sendEmail } from "../utils/emailUtils";
// import { generateResetToken } from "../utils/jwtUtils";

// export class ForgotPasswordUserUseCase {
//     constructor(
//         private userRepository: IUserRepository
//     ) { }

//     async execute(email: string): Promise<string> {
//         const user = await this.userRepository.findByEmail(email);
//         if (!user) throw new NotFoundError("User not found");
//         const resetToken = generateResetToken({
//             email: user.email,
//             userId: user.userId,
//             role: user.role,
//         });
//         const resetLink = `http://localhost:4000/reset-password?token=${resetToken}`;
//         const htmlContent = `
//             <p>Hi User,</p>
//             <p>Click the link below to reset your password:</p>
//             <a href=${resetLink}>reset</a>
//             <p>This link will expire in 15 minutes.</p>`
//         await sendEmail(user.email, "Reset Your Password", htmlContent)
//         return "";
//     }
// }