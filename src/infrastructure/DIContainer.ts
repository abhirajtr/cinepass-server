import { ResendOtpUserUseCase } from "../use-cases/user/ResndOtpUserUseCase";
import { SignupUserUseCase } from "../use-cases/user/SignupUserUseCase";
import { VerifyAndSignupUserUseCase } from "../use-cases/user/VerifyAndSignupUserUseCase";
import { UserRepository } from "./repositories/UserRepository"
import { MailService } from "./services/MailService";
import { PasswordHashingService } from "./services/PasswordHashingService";
import { RedisService } from "./services/RedisService";

export class DIContainer {
    private static _userRepository = new UserRepository();
    private static _passwordHashingService = new PasswordHashingService();
    private static _redisService = new RedisService();
    private static _mailService = new MailService();

    private static getUserRepository() {
        return this._userRepository;
    }
    private static getPasswordHashingService() {
        return this._passwordHashingService;
    }
    private static getRedisService() {
        return this._redisService;
    }
    private static getMailService() {
        return this._mailService;
    }
    public static getUserSignupUseCase() {
        return new SignupUserUseCase(this.getUserRepository(), this.getPasswordHashingService(), this.getMailService(), this.getRedisService());
    }
    public static getUserVerifyAndSignupUseCase() {
        return new VerifyAndSignupUserUseCase(this.getUserRepository(), this.getRedisService());
    }
    public static getResendOtpUserUseCase() {
        return new ResendOtpUserUseCase(this.getRedisService(), this.getMailService());
    }
}