import { ConflictError } from "../../domain/errors/ConflictError";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../domain/errors/UnauthorizedError";
import { IMailService } from "../../domain/interfaces/IMailService";
import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import { IRedisService } from "../../domain/interfaces/IRedisService";
import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { generateUserId } from "../../utils/idGenerator";
import { generateOtp } from "../../utils/otpGenerator";

export class SignupTheatreUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
        private passwordHashingService: IPasswordHashingService,
        private mailService: IMailService,
        private redisService: IRedisService,
    ) { }

    async storeAndSendOtp(name: string, email: string, phone: string, location: string, password: string): Promise<void> {
        let theatre = await this.theatreRepository.findTheatreByEmail(email);
        if (theatre) {
            throw new ConflictError('Theatre with this email already exists.');
        }
        theatre = await this.theatreRepository.findTheatreByPhone(phone);
        if (theatre) {
            throw new ConflictError('Mobile number already used');
        }
        const userId = generateUserId();
        const otp = generateOtp();
        const hashedPassword = await this.passwordHashingService.hashPassword(password);
        await this.mailService.sendVerificationEmail(email, otp);
        await this.redisService.storeOTP(email, otp, 120);
        await this.redisService.storeUser(email, { userId, name, email, password: hashedPassword, phone, location, createdAt: new Date(), updatedAt: new Date(), isBlocked: false }, 600);
    }
    async verifyOtpAndSave(email: string, otp: string): Promise<void> {
        const savedOtp = await this.redisService.getOTP(email);
        if (!savedOtp) {
            throw new ForbiddenError('OTP has expired. Please request a new one.');
        }
        if (savedOtp !== otp) {
            throw new UnauthorizedError('Invalid OTP. Please try again.');
        }
        const savedTheatre = await this.redisService.getUserData(email);
        if (!savedTheatre) {
            throw new NotFoundError('Theatre data not found. Please register again.');
        }

        await this.redisService.deleteUserFromRedis(email);
        await this.theatreRepository.saveTheatre({
            theatreId: savedTheatre.userId,
            name: savedTheatre.name!, 
            email: savedTheatre.email, 
            password: savedTheatre.password, 
            location: savedTheatre.location!, 
            phone: savedTheatre.phone!, 
            createdAt: savedTheatre.createdAt, 
            updatedAt: savedTheatre.updatedAt, 
            isBlocked: false,
            isApproved: false,
        });
    }
    async ResendOtp(email: string): Promise<void> {
        const newOtp = generateOtp();
        await this.redisService.storeOTP(email, newOtp, 120);
        await this.mailService.sendVerificationEmail(email, newOtp);
    }
}