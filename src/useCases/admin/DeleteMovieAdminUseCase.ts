import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";

export class DeleteMovieAdminUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }
    
    async execute(id: string) {
        await this.movieRepository.delete(id);
    }
}