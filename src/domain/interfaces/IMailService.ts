export interface IMailService {
    sendVerificationEmail(email: string, otp: string): Promise<void>;
}