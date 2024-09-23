import { IUserRepository } from "../../domain/interfaces/IUserRepository";

interface userDeatails {
    email: string;
    phone: string;
    username: string;
}

export class UpdateDetailsUserUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string, phone: string, username: string): Promise<userDeatails> {
        const updatedUser = await this.userRepository.updateUser(userId, { phone, username });
        return updatedUser as userDeatails;
    }
}