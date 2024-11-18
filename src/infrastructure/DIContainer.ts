// import { AddTheatreUsecase } from "../useCases/AddTheatreUseCase";
// import { BlockUnblockUserByType } from "../useCases/BlockUnblockUserByType";
// import { ForgotPasswordUseCase } from "../useCases/ForgotPasswordUseCase";
// import { ForgotPasswordUserUseCase } from "../useCases/ForgotPasswordUserUseCase";
// import { GetAllUsersByTypeUseCase } from "../useCases/GetAllUsersByTypeUseCase";
// import { GetTheatresUseCase } from "../useCases/GetTheatresUseCase";
// import { ListTheatresByOwnerUseCase } from "../useCases/ListTheatresByOwnerUseCase";
// import { LoginUseCase } from "../useCases/LoginUseCase";
// import { SignupUseCase } from "../useCases/SignupUseCase";
import { GetAllTheatreOwnersAdminUseCase } from "../useCases/admin/GetAllTheatreOwnerAdminUseCase";
import { GetAllUsersAdminUseCase } from "../useCases/admin/GetAllUsersAdminUseCase";
import { LoginAdminUseCase } from "../useCases/admin/LoginAdminUseCase";
import { ToggleBlockTheatreOwnerAdminUseCase } from "../useCases/admin/ToggleBlockTheatreOwnerAdminUseCase";
import { ToggleBlockUserAdminUseCase } from "../useCases/admin/ToggleBlockUserAdminUseCae";
import { AddTheatreTheatreOwnerUseCase } from "../useCases/theatreOwner/AddTheatreTheatreTheatreOwnerUseCase";
import { ForgotPasswordTheatreOwnerUseCase } from "../useCases/theatreOwner/ForgotPasswordTheatreOwnerUseCase";
import { GetAllTheatresTheatreOwnerUseCase } from "../useCases/theatreOwner/GetAllTheatresTheatreOwnerUseCase";
import { LoginTheatreOwnerUseCase } from "../useCases/theatreOwner/LoginTheatreOwnerUseCase";
import { SignupTheatreOwnerUseCase } from "../useCases/theatreOwner/SignupTheatreOwnerUseCase";
import { ForgotPasswordUserUseCase } from "../useCases/User/ForgotPasswordUserUseCase";
import { LoginUserUseCase } from "../useCases/User/LoginUserUseCase";
import { SignupUserUseCase } from "../useCases/User/SignupUserUseCase";
import { AdminRepository } from "./repositories/AdminRepository";
import { TheatreOwnerRepository } from "./repositories/TheatreOwnerRepository";
import { TheatreRepository } from "./repositories/TheatreRepository";
import { UserRepository } from "./repositories/UserRepository";

// src/infrastructure/DIContainer.ts
class DIContainer {
    private static _adminRepository = new AdminRepository();
    private static _theatreOwnerRepository = new TheatreOwnerRepository();
    private static _userRepository = new UserRepository();
    private static _theatreRepository = new TheatreRepository();

    static getAllTheatresTheatreOwnerUseCase() {
        return new GetAllTheatresTheatreOwnerUseCase(this.getTheatreRepository());
    }
    static getAddTheatreTheatreOwnerUseCase() {
        return new AddTheatreTheatreOwnerUseCase(this.getTheatreRepository());
    }
    static getTheatreRepository() {
        return this._theatreRepository;
    }
    static getToggleBlockTheatreOwnerAdminUseCase() {
        return new ToggleBlockTheatreOwnerAdminUseCase(this.getTheatreOwnerRepository());
    }
    static getToggleBlockUserAdminUseCase() {
        return new ToggleBlockUserAdminUseCase(this.getUserRepository());
    }
    static getGetAllTheatreOwnersAdminUseCase () {
        return new GetAllTheatreOwnersAdminUseCase(this.getTheatreOwnerRepository());
    }
    static getGetAllUsersAdminUseCase () {
        return new GetAllUsersAdminUseCase(this.getUserRepository());
    }
    static getAdminRepository() {
        return this._adminRepository;
    }
    static getTheatreOwnerRepository() {
        return this._theatreOwnerRepository;
    }
    static getUserRepository() {
        return this._userRepository;
    }
    static getLoginAdminUseCase() {
        return new LoginAdminUseCase(this.getAdminRepository());
    }
    static getLoginTheatreOwnerUseCase() {
        return new LoginTheatreOwnerUseCase(this.getTheatreOwnerRepository());
    }

    static getSignupTheatreOwnerUseCase() {
        return new SignupTheatreOwnerUseCase(this.getTheatreOwnerRepository());
    } 
    static getSignupUserUseCase() {
        return new SignupUserUseCase(this.getUserRepository());
    } 
    static getLoginUserUseCase() {
        return new LoginUserUseCase(this.getUserRepository());
    }
    static getForgotPasswordUserUseCase() {
        return new ForgotPasswordUserUseCase(this.getUserRepository());
    }
    static getForgotPasswordTheatreOwnerUseCase() {
        return new ForgotPasswordTheatreOwnerUseCase(this.getTheatreOwnerRepository());
    }

    // static getTheatreRepository() {
    //     return this._theatreRepository;
    // }

    // static getSignupUserUseCase() {
    //     return new SignupUseCase(this.getUserRepository());
    // }

    // static getLoginUserUseCase() {
    //     return new LoginUseCase(this.getUserRepository());
    // }
    // static getForgotPasswordUserUseCase() {
    //     return new ForgotPasswordUseCase(this.getUserRepository());
    // }

    // static getAllUsersByTypeUseCase() {
    //     return new GetAllUsersByTypeUseCase(this.getUserRepository());
    // }
    // static getBlockUnblockUserByTypeUseCase() {
    //     return new BlockUnblockUserByType(this.getUserRepository());
    // }

    // static getAddTheatreUseCase() {
    //     return new AddTheatreUsecase(this.getTheatreRepository());
    // }
    // static getListTheatreByOwnerUseCase() {
    //     return new ListTheatresByOwnerUseCase(this.getTheatreRepository());
    // }
    // static getTheatresUseCase() {
    //     return new GetTheatresUseCase(this.getTheatreRepository());
    // }
    // static getForgotPasswordUserUseCase1() {
    //     return new ForgotPasswordUserUseCase(this.getUserRepository());
    // }
}

export { DIContainer };