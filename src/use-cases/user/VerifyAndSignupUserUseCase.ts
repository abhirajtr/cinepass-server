import { IRedisService } from "../../domain/interfaces/IRedisService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { GoneError } from "../../domain/errors/GoneError";
import { BadRequestError } from "../../domain/errors/BadRequestError";

export class VerifyAndSignupUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private redisService: IRedisService,
    ) { }

    async execute(email: string, otp: string):Promise<void> {
        const storedOtp = await this.redisService.getOTP(email);

        if (!storedOtp) {
            throw new GoneError('The OTP has expired. Please request a new OTP.');
        }
        if (storedOtp !== otp) {
            throw new BadRequestError('The OTP provided is invalid. Please check and try again.');
        }
        const user = await this.redisService.getUserData(email);
        if (!user) {
            throw new NotFoundError('No user found with this email. Please sign up again.');
        }
        
        await this.userRepository.createUser({
            ...user,
            phone: user.phone as string,
            username: user.username as string,
        });
        await this.redisService.deleteUserFromRedis(email);
    }
}