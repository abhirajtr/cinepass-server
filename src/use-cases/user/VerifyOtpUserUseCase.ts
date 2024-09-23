import { GoneError } from "../../domain/errors/GoneError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IRedisService } from "../../domain/interfaces/IRedisService";

export class VerifyOtpUserUseCase {
    constructor(
        private redisService: IRedisService,
    ) {}

    async execute(email: string, otp: string): Promise<void> {
        const savedOtp = await this.redisService.getOTP(email);
        if (!savedOtp) {
            throw new GoneError('OTP expired');
        }
        if (savedOtp !== otp) {
            throw new UnauthorizedError('Invalid OTP');
        }
    }
}