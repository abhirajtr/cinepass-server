import { BlockUserAdminUseCase } from "../use-cases/admin/BlockUserAdminUseCase";
import { GetAllUsersAdminUseCase } from "../use-cases/admin/GetAllUsersAdminUseCase";
import { LoginAdminUseCase } from "../use-cases/admin/LoginAdminUseCase";
import { SignupTheatreUseCase } from "../use-cases/theatre/SignupTheatreUseCase";
import { ForgotPasswordUserUseCase } from "../use-cases/user/ForgotPasswordUserUseCase";
import { GetUserDetailsUserUseCase } from "../use-cases/user/GetUserDetailsUserUseCase";
import { LoginUserUseCase } from "../use-cases/user/LoginUserUseCase";
import { RefreshTokenUseCase } from "../use-cases/user/RefreshTokenUseCase";
import { ResetPasswordUserUseCase } from "../use-cases/user/ResetPasswordUserUseCase";
import { ResendOtpUserUseCase } from "../use-cases/user/ResndOtpUserUseCase";
import { SignupUserUseCase } from "../use-cases/user/SignupUserUseCase";
import { UpdateDetailsUserUseCase } from "../use-cases/user/UpdateDetailsUserUseCase";
import { UpdatePasswordUserUseCase } from "../use-cases/user/UpdatePasswordUserUseCase";
import { VerifyAndSignupUserUseCase } from "../use-cases/user/VerifyAndSignupUserUseCase";
import { VerifyOtpUserUseCase } from "../use-cases/user/VerifyOtpUserUseCase";
import { AdminRepository } from "./repositories/AdminRepository";
import { TheatreRepository } from "./repositories/TheatreRepository";
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
    private static _adminRepository = new AdminRepository();
    private static _theatreRepository = new TheatreRepository();

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
    private static getAdminRepository() {
        return this._adminRepository;
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
    public static getForgotPasswordUserUseCase() {
        return new ForgotPasswordUserUseCase(this.getUserRepository(), this.getMailService(), this.getRedisService());
    }
    public static getVerifyOtpUserUseCase() {
        return new VerifyOtpUserUseCase(this.getRedisService());
    }
    public static getResetPasswordUserUseCase() {
        return new ResetPasswordUserUseCase(this.getUserRepository(), this.getPasswordHashingService());
    }
    public static getLoginAdminUseCase() {
        return new LoginAdminUseCase(this.getAdminRepository(), this.getPasswordHashingService(), this.getTokenService());
    }
    public static getAllUsersAdminUseCase() {
        return new GetAllUsersAdminUseCase(this.getUserRepository());
    }
    public static getBlockUserAdminUseCase() {
        return new BlockUserAdminUseCase(this.getUserRepository());
    }
    private static getTheatreRepository() {
        return this._theatreRepository;
    }
    public static getSignupTheatreUseCase() {
        return new SignupTheatreUseCase(this.getTheatreRepository(), this.getPasswordHashingService(), this.getMailService(), this.getRedisService());
    }
}