import { Show } from "../../domain/entities/Show";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IScreenRepository } from "../../domain/interfaces/IScreenRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { ISeat } from "../../infrastructure/models/ScreenModel";
import { generateUserId } from "../../utils/uuidUtils";

export class CreateShowUseCase {
    constructor(
        private showRepository: IShowRepository,
        private screenRepository: IScreenRepository,
    ) { }

    async execute(theatreId: string, screenId: string, movie: string, startTime: Date, endTime: Date) {
        const screen = await this.screenRepository.getScreenById(screenId);
        // console.log(screen?.seatLayout);
        if (!screen) {
            throw new NotFoundError("Screen not found");
        }
        if (!screen.seatLayout || screen.seatLayout.length === 0) {
            throw new Error("Seat layout is missing or invalid in the screen entity");
        }

        const show = new Show(
            generateUserId(),
            theatreId,
            screenId,
            movie,
            startTime,
            endTime,
            screen.seatLayout,
        )
        const response = await this.showRepository.createShow(show);
    }
}