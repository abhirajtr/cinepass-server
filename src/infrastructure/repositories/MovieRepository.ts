import { Movie } from "../../domain/entities/Movie";
import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { MovieModel } from "../models/MovieModel";

export class MovieRepository implements IMovieRepository {
    async create(movie: Movie): Promise<Movie> {
        console.log("movieTosave", movie);

        const newMovie = new MovieModel(movie);
        return await newMovie.save();
    }

    async getAll(query: Record<string, any>): Promise<Movie[]> {
        return await MovieModel.find(query);
    }

    async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ id });
    }

    async getMovieById(movieId: string): Promise<Movie | null> {
        const movieDetails = await MovieModel.findOne({ movieId: movieId });
        return movieDetails ?? null;
    }
    async getUpcomingMovies(): Promise<Movie[]> {
        try {
            const currentDate = new Date();
            return await MovieModel.find({
                releaseDate: { $gte: currentDate.toISOString() },
            }).sort({ releaseDate: 1 });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching upcoming movies: ${error.message}`);
            }
            throw new Error('An unknown error occurred while fetching upcoming movies.');
        }
    }
}