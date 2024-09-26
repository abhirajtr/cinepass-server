import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class GetAllUsersAdminUseCase {
    constructor(
        private UserRepository: IUserRepository,
    ) { }

    async execute(page: number = 1, limit: number = 10, searchTerm: string = ""): Promise<{ users: User[], totalPages: number }> {        
        const skip = page - 1;        
        const users = await this.UserRepository.getAllUsers(skip, limit, searchTerm);
        const usersCount = await this.UserRepository.getUsersCount(searchTerm);
        const totalPages = Math.ceil(usersCount/ limit);
        return { users, totalPages };
    }
}