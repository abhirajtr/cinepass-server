import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetAllTheatreAdminUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute() {
        return await this.theatreRepository.findAll(); 
    }
}