import { IShowRepository } from "../../domain/interfaces/IShowRepository";

export class UpdateShowUseCase {
    constructor(
        private showRepository: IShowRepository,
    ) { }

    async execute(showId: string, movieId: string, movieTitle: string, startTime: Date) {
        await this.showRepository.updateShow(showId, { movieId, movieTitle, startTime });
    }
}