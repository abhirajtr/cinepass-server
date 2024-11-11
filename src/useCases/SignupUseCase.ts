import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { User, UserRole } from "../domain/entities/User";
import { generateOtp } from "../utils/otpUtils";
import { generateUserId } from "../utils/uuidUtils";
import { hashPassword } from "../utils/passwordUtils";
import { redisClient } from "../infrastructure/redisClient";
import { ConflictError } from "../domain/errors/ConflictError";
import { NotFoundError } from "../domain/errors/NotFoundError";
import { DataParsingError } from "../domain/errors/DataParsingError";
import { BadRequestError } from "../domain/errors/BadRequestError";
import { sendEmail } from "../utils/emailUtils";
import { signupEmailContent } from "../utils/signupEmailContent";

export class SignupUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    private async storeUserInRedis(email: string, otp: string, userData: Omit<User, 'password'>, password: string): Promise<void> {
        const OTP_EXPIRATION_TIME = 600; // OTP expiration time in seconds (10 minutes)
        const userWithOtp = {
            otp,
            user: userData,
            password // Store the plain password temporarily
        };

        await redisClient.setex(email, OTP_EXPIRATION_TIME, JSON.stringify(userWithOtp));
    }

    public async execute(email: string, phone: string, password: string, role: UserRole): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictError("Email is already in use");
        }

        const otp = generateOtp();

        const newUser = new User(
            '', // Temporary userId
            '', // Temporary name
            email,
            phone,
            new Date(), // Temporary createdAt
            role,
            password,
            false, // Default isBlocked set to false
        );

        const htmlContent = signupEmailContent(otp); //html template
        const subject = "CinePass Signup - OTP Verification";
        Promise.all([
            this.storeUserInRedis(email, otp, newUser, password),
            sendEmail(email, subject, htmlContent)
        ]);

        console.log(`OTP for ${email}: ${otp}`);
    }

    public async verifyOtpAndSignup(email: string, enteredOtp: string): Promise<void> {
        const storedData = await redisClient.get(email);
        if (!storedData) {
            throw new NotFoundError("OTP has expired or does not exist.");
        }

        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
        } catch (err) {
            throw new DataParsingError("Failed to parse data from Redis.");
        }

        const storedOtp = parsedData.otp;
        const userData = parsedData.user;

        if (storedOtp !== enteredOtp) {
            throw new BadRequestError("Invalid OTP.");
        }

        const hashedPassword = await hashPassword(userData.password);

        // Create a final user object with the hashed password
        const user = new User(
            generateUserId(),
            '', // username
            userData.email,
            userData.phone,
            new Date(), // Created at the time of signup
            userData.role, // user role
            hashedPassword, // Set the hashed password
            userData.isBlocked,
        );

        await Promise.all([
            this.userRepository.create(user),
            redisClient.del(email)
        ]);
    }

    public async resendOtp(email: string): Promise<void> {
        // Retrieve the existing user data in Redis
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
        
        const htmlContent = signupEmailContent(newOtp); //html template
        const subject = "CinePass Signup - OTP Verification (Resend)";
        Promise.all([
            redisClient.setex(email, OTP_EXPIRATION_TIME, JSON.stringify(parsedData)),
            sendEmail(email, subject, htmlContent)
        ])

        console.log(`Resent OTP for ${email}: ${newOtp}`);
    }
}
