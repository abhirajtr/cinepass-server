import { MovieRepository } from "../../infrastructure/repositories/MovieRepository";

export class GetAllMoviesAdminUseCase {
    constructor(
        private movieRepository: MovieRepository,
    ) { }

    async execute(searchTerm: string) {
        // Construct the query object dynamically
        const query: Record<string, any> = {};

        if (searchTerm) {
            query.title = { $regex: searchTerm, $options: 'i' };
        }

        return await this.movieRepository.getAll(query);
    }
}