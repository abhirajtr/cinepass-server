import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetTheatreDetailsTheatreOwnerUseCase{
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatreId: string) {
        return await this.theatreRepository.find(theatreId);
    }
}