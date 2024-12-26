import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";

export class SearchMovieUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }

    async execute(search: string) {
        const query = { title: { $regex: search, $options: 'i' } };
        return await this.movieRepository.getAll(query);
    }
}