// import { ForbiddenError } from "../domain/errors/ForbiddenError";
// import { NotFoundError } from "../domain/errors/NotFoundError";
// import { UnauthorizedError } from "../domain/errors/UnauthorizedError";
// import { IUserRepository } from "../domain/interfaces/IUserRepository";
// import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils";
// import { comparePassword } from "../utils/passwordUtils";

// export class LoginUseCase {
//     constructor(
//         private userRepository: IUserRepository,
//     ) { }

//     async execute(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
//         const user = await this.userRepository.findByEmail(email);
//         if (!user) throw new NotFoundError("User not found");
//         const isPasswordMatch = await comparePassword(password, user.password);

//         if (!isPasswordMatch) throw new UnauthorizedError("password Inavalid");

//         if (user.isBlocked) throw new ForbiddenError("Your account has been blocked. Please contact support");

//         const accessToken = generateAccessToken({ email: user.email, userId: user.userId, role: user.role });
//         const refreshToken = generateRefreshToken({ email: user.email, userId: user.userId, role: user.role });
//         return { accessToken, refreshToken }
//     }
// }