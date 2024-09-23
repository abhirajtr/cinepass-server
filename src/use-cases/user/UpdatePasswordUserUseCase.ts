import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class UpdatePasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHashingService: IPasswordHashingService,
    ) { }

    async execute(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new NotFoundError('User not found.');
        }        
        const isPasswordMatch = await this.passwordHashingService.comparePassword(oldPassword, user?.password!);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('Old password does not match.');
        }
        const hashPassword = await this.passwordHashingService.hashPassword(newPassword);
        await this.userRepository.updateUser(userId, { password: hashPassword });
    }
}