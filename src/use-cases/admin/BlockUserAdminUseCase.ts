import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class BlockUserAdminUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string, isBlocked: boolean): Promise<void> {
        const isExistingUser = await this.userRepository.findUserById(userId);
        if (!isExistingUser) {
            throw new NotFoundError('User not found');
        }
        await this.userRepository.updateUser(userId, { isBlocked });
    }
}