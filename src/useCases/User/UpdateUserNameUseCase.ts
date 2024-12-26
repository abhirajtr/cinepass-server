import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class UpdateUserNameUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }
    async execute(userId: string, newName: string) {
        return await this.userRepository.updateById(userId, { name: newName });
    }
}