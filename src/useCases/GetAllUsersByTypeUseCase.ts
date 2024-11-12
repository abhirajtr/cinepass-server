import { UserRole } from "../domain/entities/User";
import { IUserRepository } from "../domain/interfaces/IUserRepository";

interface IUser {
    userId: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
}

export class GetAllUsersByTypeUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(search: string, isBlocked: boolean | "", userRole: UserRole, skip: number, limit: number): Promise<{ users: IUser[], totalCount: number }> {
        // console.log(search, isBlocked, userRole);

        const { users, totalCount } = await this.userRepository.findAllUsers(search, isBlocked, userRole, skip, limit);
        return { users, totalCount };
    }
}