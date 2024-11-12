import { BlockUnblockUserByType } from "../useCases/BlockUnblockUserByType";
import { ForgotPasswordUseCase } from "../useCases/ForgotPasswordUseCase";
import { GetAllUsersByTypeUseCase } from "../useCases/GetAllUsersByTypeUseCase";
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

    static getAllUsersByTypeUseCase() {
        return new GetAllUsersByTypeUseCase(this.getUserRepository());
    }
    static getBlockUnblockUserByTypeUseCase() {
        return new BlockUnblockUserByType(this.getUserRepository());
    }
}

export { DIContainer };