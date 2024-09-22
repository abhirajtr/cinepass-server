import { strict } from "assert";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

interface userDetails {
    email: string;
    phone: string;
    username: string;
}

export class GetUserDetailsUserUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string): Promise<userDetails> {
        const user = await this.userRepository.findUserById(userId) as userDetails;
        const { email, phone, username } = user;
        return { email, phone, username };
    }
}