import { Movie } from "../entities/Movie";

export interface IMovieRepository {
    create(movie: Movie): Promise<Movie>;
    getAll(query: Record<string, any>): Promise<Movie[]>;
    delete(id: string): Promise<void>;
}