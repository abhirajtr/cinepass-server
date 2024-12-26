import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { ShowModel } from "../../infrastructure/models/ShowModel";

export class GetTheatresForMovieUseCase {
    constructor(
        private movieRepository: IMovieRepository,
        private showRepository: IShowRepository,
    ) { }

    async execute(movieId: string, date: string, city: string) {
        console.log(date, new Date(date));
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        const movie = await this.movieRepository.getMovieById(movieId);        
        const theatres = await this.showRepository.getTheatresWithShowsByMovieId(movieId, startDate, endDate);
        return { movie, theatres }
    }
}