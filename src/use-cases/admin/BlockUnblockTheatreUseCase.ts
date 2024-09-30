import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class BlockUnblockTheatreUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) { }

    async execute(theatreId: string, isBlocked: boolean) {
        const updatedTheatre = await this.theatreRepository.updateTheatreById(theatreId, { isBlocked });
        return updatedTheatre;
    }
}