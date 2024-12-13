import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";

export class GetMovieDetailsUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }

    async execute(movieId: string) {
        const movieDetails = await this.movieRepository.getMovieById(movieId);
        if (!movieDetails) {
            throw new Error("Movie Not found");
        }
        return movieDetails;
    }
}