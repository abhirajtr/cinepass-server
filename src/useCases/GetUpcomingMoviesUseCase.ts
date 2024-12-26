import { IMovieRepository } from "../domain/interfaces/IMovieRepository";

export class GetUpcomingMoviesUseCase {
    constructor(
        private movieRepository: IMovieRepository
    ) { }

    async execute() {
        try {
            return await this.movieRepository.getUpcomingMovies();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching upcoming movies: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching upcoming movies.');
            }
        }
    }
}
