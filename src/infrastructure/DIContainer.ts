import { AddMovieAdminUseCase } from "../useCases/admin/AddMovieAdminUseCase";
import { DeleteMovieAdminUseCase } from "../useCases/admin/DeleteMovieAdminUseCase";
import { GetAllMoviesAdminUseCase } from "../useCases/admin/GetAllMoviesAdminUseCase";
import { GetAllTheatreAdminUseCase } from "../useCases/admin/GetAllTheatreAdminUseCase";
import { GetAllTheatreOwnersAdminUseCase } from "../useCases/admin/GetAllTheatreOwnerAdminUseCase";
import { GetAllUsersAdminUseCase } from "../useCases/admin/GetAllUsersAdminUseCase";
import { GetTheatreDocumentUrlAdminUseCase } from "../useCases/admin/GetTheatreDocumentUrlAdminUseCase";
import { LoginAdminUseCase } from "../useCases/admin/LoginAdminUseCase";
import { RejectTheatreAdminUseCase } from "../useCases/admin/RejectTheatreAdminUseCase";
import { ToggleBlockTheatreOwnerAdminUseCase } from "../useCases/admin/ToggleBlockTheatreOwnerAdminUseCase";
import { ToggleBlockUserAdminUseCase } from "../useCases/admin/ToggleBlockUserAdminUseCae";
import { VerifyTheatreAdminUseCase } from "../useCases/admin/VerifyTheatreAdminUseCase";
import { AddTheatreTheatreOwnerUseCase } from "../useCases/theatreOwner/AddTheatreTheatreTheatreOwnerUseCase";
import { EditTheatreTheatreOwnerUseCase } from "../useCases/theatreOwner/EditTheatreTheatreOwnerUseCase";
import { ForgotPasswordTheatreOwnerUseCase } from "../useCases/theatreOwner/ForgotPasswordTheatreOwnerUseCase";
import { GetAllTheatresTheatreOwnerUseCase } from "../useCases/theatreOwner/GetAllTheatresTheatreOwnerUseCase";
import { GetTheatreDetailsTheatreOwnerUseCase } from "../useCases/theatreOwner/GetTheatreDetailsTheatreOwnerUseCase";
import { LoginTheatreOwnerUseCase } from "../useCases/theatreOwner/LoginTheatreOwnerUseCase";
import { SignupTheatreOwnerUseCase } from "../useCases/theatreOwner/SignupTheatreOwnerUseCase";
import { ForgotPasswordUserUseCase } from "../useCases/User/ForgotPasswordUserUseCase";
import { GetMovieDetailsUseCase } from "../useCases/User/GetMovieDetailsUseCase";
import { LoginUserUseCase } from "../useCases/User/LoginUserUseCase";
import { SignupUserUseCase } from "../useCases/User/SignupUserUseCase";
import { AdminRepository } from "./repositories/AdminRepository";
import { BookingRepository } from "./repositories/BookingRepository";
import { MovieRepository } from "./repositories/MovieRepository";
import { ScreenRepository } from "./repositories/ScreenRepository";
import { ShowRepository } from "./repositories/ShowRepository";
import { TheatreOwnerRepository } from "./repositories/TheatreOwnerRepository";
import { TheatreRepository } from "./repositories/TheatreRepository";
import { UserRepository } from "./repositories/UserRepository";

class DIContainer {
    private static _adminRepository = new AdminRepository();
    private static _theatreOwnerRepository = new TheatreOwnerRepository();
    private static _userRepository = new UserRepository();
    private static _theatreRepository = new TheatreRepository();
    private static _movieRepository = new MovieRepository();
    private static _screenRepository = new ScreenRepository();
    private static _showRepository = new ShowRepository();
    private static _bookingRepository = new BookingRepository();


    static getBookingRepository() {
        return this._bookingRepository;
    }    
    static getShowRepository() {
        return this._showRepository;
    }
    static getScreenRepository() {
        return this._screenRepository;
    }

    static getGetMovieDetailsUseCase() {
        return new GetMovieDetailsUseCase(this.getMovieRepository());
    }
    static getEditTheatreTheatreOwnerUseCase() {
        return new EditTheatreTheatreOwnerUseCase(this.getTheatreRepository());
    }
    static getGetTheatreDetailsTheatreOwnerUseCase() {
        return new GetTheatreDetailsTheatreOwnerUseCase(this.getTheatreRepository());
    }

    static getDeleteMovieAdminUseCase() {
        return new DeleteMovieAdminUseCase(this.getMovieRepository());
    }
    static getGetAllMoviesAdminUseCase() {
        return new GetAllMoviesAdminUseCase(this.getMovieRepository());
    }
    static getAddMovieAdminUseCase() {
        return new AddMovieAdminUseCase(this.getMovieRepository());
    }
    static getMovieRepository() {
        return this._movieRepository;
    }
    static getRejectTheatreAdminUseCase() {
        return new RejectTheatreAdminUseCase(this.getTheatreRepository());
    }
    static getVerifyTheatreAdminUseCase() {
        return new VerifyTheatreAdminUseCase(this.getTheatreRepository());
    }
    static getGetTheatreDocumnetUrlAdminUseCase() {
        return new GetTheatreDocumentUrlAdminUseCase();
    }
    static getGetAllTheatresAdminUseCase() {
        return new GetAllTheatreAdminUseCase(this.getTheatreRepository());
    }

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
    static getGetAllTheatreOwnersAdminUseCase() {
        return new GetAllTheatreOwnersAdminUseCase(this.getTheatreOwnerRepository());
    }
    static getGetAllUsersAdminUseCase() {
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