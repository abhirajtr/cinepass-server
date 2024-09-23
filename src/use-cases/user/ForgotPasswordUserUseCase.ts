import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IMailService } from "../../domain/interfaces/IMailService";
import { IRedisService } from "../../domain/interfaces/IRedisService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { generateOtp } from "../../utils/otpGenerator";

export class ForgotPasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private mailService: IMailService,
        private redisService: IRedisService,
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findUserByEmail(email);        
        if (!user) {
            throw new NotFoundError('User not found with this email address.');
        }
        const otp = generateOtp();
        await this.mailService.sendVerificationEmail(email, otp);
        await this.redisService.storeOTP(email, otp, 120);
    }
}