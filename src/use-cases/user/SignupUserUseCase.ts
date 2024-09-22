import { User } from "../../domain/entities/User";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { IRedisService } from "../../domain/interfaces/IRedisService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ConflictError } from "../../domain/errors/ConflictError";
import { generateUserId } from "../../utils/idGenerator";
import { generateOtp } from "../../utils/otpGenerator";
import { IMailService } from "../../domain/interfaces/IMailService";

export class SignupUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHashingService: IPasswordHashingService,
        private mailService: IMailService,
        private redisService: IRedisService,
    ) { }

    async execute(email: string, phone: string, password: string): Promise<void> {
        const existingUser = await this.userRepository.userExistsByEmail(email);
        if (existingUser) {
            throw new ConflictError('User already exists');
        }
        const hashedPasssword = await this.passwordHashingService.hashPassword(password);

        const newUser = new User(
            generateUserId(),
            email,
            phone,
            hashedPasssword,
            false,
            new Date(),
            new Date(),
            ""
        );
        const otp = generateOtp();
        await this.mailService.sendVerificationEmail(email, otp);
        await this.redisService.storeOTP(email, otp, 120);
        await this.redisService.storeUser(email, newUser, 600);
    }
}