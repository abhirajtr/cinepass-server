import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { ShowModel } from "../../infrastructure/models/ShowModel";

export class GetShowsByMovieIdUseCase {
    constructor(
        private showRepository: IShowRepository,
        private movieRepository: IMovieRepository,
    ) { }

    async execute(movieId: string, date: Date) {
        console.log("movieId", movieId);
    
        const selectedDate = new Date(date);
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
    
        const movie = await this.movieRepository.getMovieById(movieId);
    
        const isToday = selectedDate.toDateString() === new Date().toDateString();
        const currentTime = new Date();
    
        const queryFilter: any = {
            movieId,
            startTime: { $gte: startOfDay, $lt: endOfDay },
        };
    
        if (isToday) {
            queryFilter.startTime.$gte = currentTime;
        }
    
        const shows = await ShowModel.find(queryFilter)
            .populate({
                path: "theatreId",
                select: "name latitude longitude city",
                localField: "theatreId",
                foreignField: "theatreId",
                model: "theatre",
            })
            .lean();
    
        // Group by theatre
        const groupedShows = new Map();
    
        for (const show of shows) {
            const theatreId = show.theatreId;
    
            if (!groupedShows.has(theatreId)) {
                groupedShows.set(theatreId, {
                    theatre: show.theatreId,
                    showTimes: [],
                });
            }
    
            // Add both startTime and showId to the respective theatre's showTimes
            groupedShows.get(theatreId).showTimes.push({
                startTime: show.startTime,
                showId: show.showId, // Assuming _id is the unique identifier for the show
            });
        }
    
        // Transform and sort the grouped data by showTimes in ascending order
        const transformedShows = Array.from(groupedShows.entries()).map(([theatreId, data]) => ({
            theatre: data.theatre,
            showTimes: data.showTimes.sort(
                (a: { startTime: Date }, b: { startTime: Date }) => a.startTime.getTime() - b.startTime.getTime()
            ), // Sort showTimes in ascending order
        }));
    
        console.log("Grouped Shows--->", transformedShows);
    
        return { shows: transformedShows, movie };
    }
}
