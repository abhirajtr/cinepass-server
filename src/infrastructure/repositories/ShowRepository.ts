import { Show } from "../../domain/entities/Show";
import { IShowRepository, ITheatreWithShows } from "../../domain/interfaces/IShowRepository";
import { ShowModel } from "../models/ShowModel";

export class ShowRepository implements IShowRepository {
    async createShow(show: Show): Promise<Show> {
        return await ShowModel.create(show);
    }

    async getAllShowsByScreenId(screenId: string): Promise<Show[]> {
        return await ShowModel.find({ screenId });
    }

    async findById(showId: string): Promise<Show | null> {
        return await ShowModel.findOne({ showId });
    }
    async updateSeats(showId: string, selectedSeats: string[], isReserved: boolean): Promise<void> {
        const show = await ShowModel.findOne({ showId }).exec();
        if (!show) {
            throw new Error('Show not found');
        }
        show.seatLayout.forEach((row) => {
            row.forEach((seat) => {
                if (selectedSeats.includes(seat.label)) {
                    seat.isBooked = isReserved;
                }
            });
        });
        await show.save();
    }

    async getShows(query: { [key: string]: any }): Promise<Show[]> {
        const shows = await ShowModel.find(query);
        return shows;
    }
    async getTheatresWithShowsByMovieId(movieId: string, startDate: Date, endDate: Date): Promise<ITheatreWithShows[]> {
        const data = await ShowModel.aggregate([
            {
                $match: {
                    movieId,
                    startTime: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $lookup: {
                    from: 'theatres',
                    localField: 'theatreId',
                    foreignField: 'theatreId',
                    as: 'theatreDetails',
                },
            },
            {
                $unwind: '$theatreDetails',
            },
            {
                $group: {
                    _id: '$theatreDetails.theatreId',
                    theatreId: { $first: '$theatreDetails.theatreId' },
                    name: { $first: '$theatreDetails.name' },
                    address: { $first: '$theatreDetails.address' },
                    city: { $first: '$theatreDetails.city' },
                    state: { $first: '$theatreDetails.state' },
                    shows: {
                        $push: {
                            showId: '$showId',
                            movieTitle: '$movieTitle',
                            startTime: '$startTime',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    theatreId: 1,
                    name: 1,
                    address: 1,
                    city: 1,
                    state: 1,
                    shows: {
                        $sortArray: { input: '$shows', sortBy: { startTime: 1 } },
                    },
                },
            },
        ]);

        return data as ITheatreWithShows[];
    }
    async updateShow(showId: string, updates: { movieId?: string; movieTitle?: string; startTime?: Date }): Promise<void> {
        const show = await ShowModel.findOne({ showId }).exec();
        if (!show) {
            throw new Error("Show not found");
        }

        // Apply updates if they are provided
        if (updates.movieId) {
            show.movieId = updates.movieId;
        }
        if (updates.movieTitle) {
            show.movieTitle = updates.movieTitle;
        }
        if (updates.startTime) {
            show.startTime = updates.startTime;
        }

        await show.save();
    }
}