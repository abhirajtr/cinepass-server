import axios from "axios";
import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { Movie } from "../../domain/entities/Movie";

interface IGenre {
    id: number;
    name: string;
}

type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

type CrewMember = {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
};

export class AddMovieAdminUseCase {
    constructor(private movieRepository: IMovieRepository) { }

    async execute(id: string) {
        try {
            console.log("id", id);

            // Fetch movie details with credits
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_Read_Access_Token}`,
                    },
                }
            );

            // Extract genres
            const genre: string[] = data.genres.map((item: IGenre) => item.name);

            // Limit cast to the first 5 members
            const cast = data.credits.cast.slice(0, 5).map((actor: CastMember) => ({
                id: actor.id,
                name: actor.name,
                character: actor.character,
                profilePath: actor.profile_path,
            }));

            // Limit crew to the first 5 members
            const crew = data.credits.crew.slice(0, 5).map((crewMember: CrewMember) => ({
                id: crewMember.id,
                name: crewMember.name,
                job: crewMember.job,
                profilePath: crewMember.profile_path,
            }));

            // console.log("Genres:", genre);
            // console.log("Cast:", cast);
            // console.log("Crew:", crew);

            // Create a new Movie instance
            const newMovie = new Movie(
                id,
                data.original_title,
                genre,
                data.original_language,
                data.release_date,
                data.poster_path,
                data.runtime,
                data.backdrop_path,
                data.overview,
                data.vote_average,
                data.vote_count,
                cast,
                crew
            );

            // Save the movie to the repository
            await this.movieRepository.create(newMovie);
        } catch (error) {
            console.log(error);
            throw new Error("Error adding Movie");
        }
    }
}
