import { GetUserDetailsUserUseCase } from "../use-cases/user/GetUserDetailsUserUseCase";
import { LoginUserUseCase } from "../use-cases/user/LoginUserUseCase";
import { RefreshTokenUseCase } from "../use-cases/user/RefreshTokenUseCase";
import { ResendOtpUserUseCase } from "../use-cases/user/ResndOtpUserUseCase";
import { SignupUserUseCase } from "../use-cases/user/SignupUserUseCase";
import { UpdateDetailsUserUseCase } from "../use-cases/user/UpdateDetailsUserUseCase";
import { UpdatePasswordUserUseCase } from "../use-cases/user/UpdatePasswordUserUseCase";
import { VerifyAndSignupUserUseCase } from "../use-cases/user/VerifyAndSignupUserUseCase";
import { UserRepository } from "./repositories/UserRepository"
import { MailService } from "./services/MailService";
import { PasswordHashingService } from "./services/PasswordHashingService";
import { RedisService } from "./services/RedisService";
import { TokenService } from "./services/TokenService";

export class DIContainer {
    private static _userRepository = new UserRepository();
    private static _passwordHashingService = new PasswordHashingService();
    private static _redisService = new RedisService();
    private static _mailService = new MailService();
    private static _tokenService = new TokenService();

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
    public static getTokenService() {
        return this._tokenService;
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
    public static getLoginUserUseCase() {
        return new LoginUserUseCase(this.getUserRepository(), this.getPasswordHashingService(), this.getTokenService());
    }
    public static getGetUserDetailsUserUseCase() {
        return new GetUserDetailsUserUseCase(this.getUserRepository());
    }
    public static getRefreshTokenUseCase() {
        return new RefreshTokenUseCase(this.getTokenService());
    }
    public static getUpdateDetailsUserUseCase() {
        return new UpdateDetailsUserUseCase(this.getUserRepository());
    }
    public static getUpdatePasswordUserUseCase() {
        return new UpdatePasswordUserUseCase(this.getUserRepository(), this.getPasswordHashingService());
    }
}