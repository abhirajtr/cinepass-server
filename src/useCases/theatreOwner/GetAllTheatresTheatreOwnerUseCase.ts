import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetAllTheatresTheatreOwnerUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) {}

    async execute(ownerId: string) {
        return await this.theatreRepository.findTheatreByTheatreOwnerId(ownerId);
    }
}