import { Movie } from "../../domain/entities/Movie";
import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { MovieModel } from "../models/MovieModel";

export class MovieRepository implements IMovieRepository {
    async create(movie: Movie): Promise<Movie> {
        const newMovie = new MovieModel(movie);
        return await newMovie.save();
    }

    async getAll(query: Record<string, any>): Promise<Movie[]> {
        return await MovieModel.find(query);
    }

    async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ id });
    }
}