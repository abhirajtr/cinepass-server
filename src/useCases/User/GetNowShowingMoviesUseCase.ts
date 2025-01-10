import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { ShowModel } from "../../infrastructure/models/ShowModel";

export class GetNowShowingMoviesUseCase {
    constructor(
        private movieRepository: IMovieRepository,
    ) { }

    async execute(city?: string) {
        console.log('Selected city:', city);
        // if (!city) {
        //     city = "Ernakulam"
        // }

        try {
            // Aggregation to fetch now-showing movies in the selected city
            const movies = await ShowModel.aggregate([
                // Step 1: Lookup theatres in the given city
                {
                    $lookup: {
                        from: "theatres", // The name of the Theatre collection
                        localField: "theatreId", // Field in Show model to match
                        foreignField: "theatreId", // Field in Theatre model to match
                        as: "theatreDetails" // Result of the lookup will be in theatreDetails
                    }
                },
                {
                    $unwind: "$theatreDetails" // Flatten the theatreDetails array
                },
                // Step 2: Filter by city and only future shows
                {
                    $match: {
                        "theatreDetails.city": city, // Only shows from theatres in the specified city
                        startTime: { $gte: new Date() } // Only shows that are happening in the future
                    }
                },
                // Step 3: Lookup the movie details (Optional: if you want all movie information from a Movie collection)
                {
                    $lookup: {
                        from: "movies", // Movie collection name
                        localField: "movieId", // The movieId in Show collection
                        foreignField: "movieId", // The movieId in Movie collection
                        as: "movieDetails" // Result will be in movieDetails
                    }
                },
                {
                    $unwind: "$movieDetails" // Flatten the movieDetails array
                },
                // Step 4: Project all movie details and the startTime (showtime)
                {
                    $project: {
                        _id: 0, // Exclude the _id field from the result
                        movieId: "$movieDetails.movieId",
                        title: "$movieDetails.title",
                        posterPath: "$movieDetails.posterPath",
                        description: "$movieDetails.description",
                        releaseDate: "$movieDetails.releaseDate",
                        genre: "$movieDetails.genre",
                        language: "$movieDetails.language",
                        runtime: "$movieDetails.runtime",
                        voteAverage: "$movieDetails.voteAverage",
                        startTime: 1 // Include the showtime (startTime)
                    }
                },
                // Step 5: Remove duplicates in case of multiple showings of the same movie
                {
                    $group: {
                        _id: "$movieId", // Group by movieId to avoid duplicates
                        title: { $first: "$title" },
                        posterPath: { $first: "$posterPath" },
                        description: { $first: "$description" },
                        releaseDate: { $first: "$releaseDate" },
                        genre: { $first: "$genre" },
                        language: { $first: "$language" },
                        runtime: { $first: "$runtime" },
                        voteAverage: {$first: "$voteAverage"},
                        startTimes: { $push: "$startTime" } // Collect all showtimes for the movie
                    }
                }
            ]);

            // Format the results into a simpler array of movies
            const formattedMovies = movies.map(movie => ({
                movieId: movie._id,
                title: movie.title,
                posterPath: movie.posterPath,
                description: movie.description,
                releaseDate: movie.releaseDate,
                genre: movie.genre,
                language: movie.language,
                voteAverage: movie.voteAverage,
                runtime: movie.runtime,
            }));

            // console.log(formattedMovies);

            return formattedMovies; // Return the list of movies currently showing
        } catch (error) {
            throw new Error("Error fetching now showing movies by city");
        }
    }
}
