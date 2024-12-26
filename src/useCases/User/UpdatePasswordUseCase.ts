import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { comparePassword, hashPassword } from "../../utils/passwordUtils";

export class UpdatePasswordUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string, currentPassword: string, password: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User Not found');
        }
        console.log(user);
        
        const isPasswordValid = await comparePassword(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Incorrect password');
        }
        const newPassword = await hashPassword(password);
        await this.userRepository.updateById(userId, {password: newPassword});
    }
}