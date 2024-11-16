import { ITheatreRepository } from "../domain/interfaces/ITheatreRepository";

export class ListTheatresByOwnerUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) {}

    async execute(ownerId: string) {
        const theatres = await this.theatreRepository.findByOwnerId(ownerId);
        return theatres;
    }
}