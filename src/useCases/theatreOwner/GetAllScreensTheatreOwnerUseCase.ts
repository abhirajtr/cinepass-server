import { IScreenRepository } from "../../domain/interfaces/IScreenRepository";

export class GetAllScreensTheatreOwnerUseCase {
    constructor(
        private screenRepository: IScreenRepository,
    ) { }

    async execute(theatreId: string) {
        return await this.screenRepository.getAllScreens(theatreId);
    }
}