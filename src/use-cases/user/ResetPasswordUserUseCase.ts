import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class ResetPasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHashingService: IPasswordHashingService,
    ) { }

    async execute(email: string, password: string): Promise<void> {
        const hashPassword = await this.passwordHashingService.hashPassword(password);
        await this.userRepository.updateUserByEmail(email, { password: hashPassword });
    }
}