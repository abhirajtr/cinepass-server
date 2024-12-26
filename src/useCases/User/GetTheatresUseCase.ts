import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetTheatresUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(search: string) {
        const query = { name: { $regex: search, $options: 'i' } };
        const theatres = await this.theatreRepository.findAll(query);
        return theatres;
    }
}