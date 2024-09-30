import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class ApproveTheatreUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) { }

    async execute(theatreId: string) {
        const updatedTheatre = await this.theatreRepository.updateTheatreById(theatreId, { isApproved: true });
        return updatedTheatre;
    }
}