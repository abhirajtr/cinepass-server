import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetUserInfoUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string) {
        return await this.userRepository.findById(userId);
    }
}