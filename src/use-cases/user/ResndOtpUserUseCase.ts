import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IMailService } from "../../domain/interfaces/IMailService";
import { IRedisService } from "../../domain/interfaces/IRedisService";
import { generateOtp } from "../../utils/otpGenerator";

export class ResendOtpUserUseCase {
    constructor(
        private redisService: IRedisService,
        private mailService: IMailService,
    ) {}

    async execute(email: string): Promise<void> {
        const isUserDataExist = await this.redisService.getUserData(email);
        if (!isUserDataExist) {
            throw new NotFoundError('User data not exist');
        }
        const newOtp = generateOtp();
        await this.mailService.sendVerificationEmail(email, newOtp);
        await this.redisService.storeOTP(email, newOtp, 120);
    }
}