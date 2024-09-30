import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetAllTheatres {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) { }

    async execute(page: number = 1, limit: number = 10, searchTerm: string = "") {
        // const searchRegex = new RegExp(searchTerm);
        const skip = (page - 1) * limit;
        const theatres = await this.theatreRepository.getAllTheatres(skip, limit, searchTerm);
        const totalTheatres = await this.theatreRepository.getTheatresCount(searchTerm);
        return { theatres, totalTheatres };
    }
}