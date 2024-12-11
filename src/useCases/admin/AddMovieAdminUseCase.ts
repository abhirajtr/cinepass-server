import axios from "axios";
import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { Movie } from "../../domain/entities/Movie";

interface IGenre {
    id: number;
    name: string;
}

export class AddMovieAdminUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }

    async execute(id: string) {
        try {
            console.log("id", process.env.TMDB_API_Read_Access_Token);

            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_Read_Access_Token}`,
                }
            });
            const genre: string[] = data.genres.map((item: IGenre) => item.name);
            console.log("data", genre);

            // const movieDetails = response.data;
            const newMovie = new Movie(id, data.original_title, genre, data.original_language, data.release_date, data.poster_path, data.runtime, data.backdrop_path);

            await this.movieRepository.create(newMovie);
        } catch (error) {
            console.log(error);

            // throw new Error("Error adding Movie");
        }
    }
}