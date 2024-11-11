import { ForgotPasswordUseCase } from "../useCases/ForgotPasswordUseCase";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { SignupUseCase } from "../useCases/SignupUseCase";
import { UserRepository } from "./repositories/UserRepository";

// src/infrastructure/DIContainer.ts
class DIContainer {
    private static _userRepository = new UserRepository();

    static getUserRepository() {
        return this._userRepository;
    }

    static getSignupUserUseCase() {
        return new SignupUseCase(this.getUserRepository());
    }

    static getLoginUserUseCase() {
        return new LoginUseCase(this.getUserRepository());
    }
    static getForgotPasswordUserUseCase() {
        return new ForgotPasswordUseCase(this.getUserRepository());
    }
}

export { DIContainer };