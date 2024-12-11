import { IScreenRepository } from "../../domain/interfaces/IScreenRepository";
import { Seat, Screen } from "../../domain/entities/Screen";
import { generateUserId } from "../../utils/uuidUtils";

export class CreateScreenTheatreOwnerUseCase {
    constructor(
        private screenRepository: IScreenRepository,
    ) { }

    async execute(theatreId: string, screenName: string, seatLayout: Seat[][], capacity: number): Promise<Screen> {
        const screenId = generateUserId();
        const screen = new Screen(
            screenId,
            theatreId,
            screenName,
            seatLayout,
            capacity,
        );
        return await this.screenRepository.createScreen(screen);
    }
}
