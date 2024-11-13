import { AddTheatreUsecase } from "../useCases/AddTheatreUseCase";
import { BlockUnblockUserByType } from "../useCases/BlockUnblockUserByType";
import { ForgotPasswordUseCase } from "../useCases/ForgotPasswordUseCase";
import { GetAllUsersByTypeUseCase } from "../useCases/GetAllUsersByTypeUseCase";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { SignupUseCase } from "../useCases/SignupUseCase";
import { TheatreRepository } from "./repositories/TheatreRepository";
import { UserRepository } from "./repositories/UserRepository";

// src/infrastructure/DIContainer.ts
class DIContainer {
    private static _userRepository = new UserRepository();
    private static _theatreRepository = new TheatreRepository();

    static getUserRepository() {
        return this._userRepository;
    }
    static getTheatreRepository() {
        return this._theatreRepository;
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

    static getAddTheatreUseCase() {
        return new AddTheatreUsecase(this.getTheatreRepository());
    }
}

export { DIContainer };