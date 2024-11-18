import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class ToggleBlockUserAdminUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string, blockStatus: boolean) {
        await this.userRepository.updateById(userId, { isBlocked: blockStatus });
    }
}