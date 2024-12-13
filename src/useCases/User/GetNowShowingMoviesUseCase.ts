import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";

export class GetNowShowingMoviesUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }

    async execute() {
        const currentDate = new Date().toISOString();

        const query = { releaseDate: { $lte: currentDate } };

        const nowShowingMovies = await this.movieRepository.getAll(query);

        return nowShowingMovies;
    }
}