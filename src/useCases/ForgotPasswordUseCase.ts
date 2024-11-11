import { BadRequestError } from "../domain/errors/BadRequestError";
import { DataParsingError } from "../domain/errors/DataParsingError";
import { NotFoundError } from "../domain/errors/NotFoundError";
import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { redisClient } from "../infrastructure/redisClient";
import { sendEmail } from "../utils/emailUtils";
import { generateOtp } from "../utils/otpUtils";
import { hashPassword } from "../utils/passwordUtils";
import { resetPasswordEmailContent } from "../utils/resetPasswordEmailContent";

export class ForgotPasswordUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }
    private async storeOtpInRedis(email: string, otp: string): Promise<void> {
        const OTP_EXPIRATION_TIME = 600;
        // Store the user data and OTP in Redis with the email as the key
        await redisClient.setex(email, OTP_EXPIRATION_TIME, JSON.stringify({ otp: otp }));
    }
    async initiatePasswordReset(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User with the provided email address does not exist.");
        const otp = generateOtp();
        console.log(otp);
        const subject = "CinePass Password Reset - OTP Verification";
        const htmlContent = resetPasswordEmailContent(otp);
        Promise.all([
            this.storeOtpInRedis(email, otp),
            sendEmail(email, subject, htmlContent)
        ])
    }
    async verifyOtp(email: string, enteredOtp: string) {
        const storedData = await redisClient.get(email);
        if (!storedData) {
            throw new NotFoundError("The OTP has either expired or does not exist. Please request a new OTP.");
        }

        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
        } catch (err) {
            throw new DataParsingError("There was an issue processing the OTP. Please try again.");
        }
        const storedOtp = parsedData.otp;
        if (storedOtp !== enteredOtp) {
            throw new BadRequestError("The entered OTP is incorrect. Please check and try again.");
        }
    }
    async updatePassword(email: string, newPassword: string) {
        const hashedPassword = await hashPassword(newPassword);
        await this.userRepository.updateByEmail(email, { password: hashedPassword });
    }


    public async resendOtp(email: string): Promise<void> {
        console.log('kitty');
        
        const storedData = await redisClient.get(email);
        if (!storedData) {
            throw new NotFoundError("No OTP request found for this email.");
        }

        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
        } catch (err) {
            throw new DataParsingError("Failed to parse data from Redis.");
        }

        // Generate a new OTP
        const newOtp = generateOtp();
        parsedData.otp = newOtp;

        // Update OTP and reset expiration time in Redis
        const OTP_EXPIRATION_TIME = 600; // OTP expiration time in seconds
        
        const htmlContent = resetPasswordEmailContent(newOtp); //html template
        const subject = "CinePass Signup - OTP Verification (Resend)";
        Promise.all([
            redisClient.setex(email, OTP_EXPIRATION_TIME, JSON.stringify(parsedData)),
            sendEmail(email, subject, htmlContent)
        ])

        console.log(`Resent OTP for ${email}: ${newOtp}`);
    }
}