import { UserRole } from "../domain/entities/User";
import { IUserRepository } from "../domain/interfaces/IUserRepository";

interface IUser {
    userId: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
}

export class BlockUnblockUserByType {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(userId: string, isBlocked: boolean, userRole: UserRole): Promise<IUser> {
        const users = await this.userRepository.updateById(userId, { isBlocked });
        return users;
    }
}