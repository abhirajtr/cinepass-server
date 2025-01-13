import { Show } from "../entities/Show";
export interface IShow {
    showId: string;
    movieTitle: string;
    startTime: Date;
}
export interface ITheatreWithShows {
    theatreId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    shows: IShow[];
}


export interface IShowRepository {
    createShow(show: Show): Promise<Show>;
    getAllShowsByScreenId(screenId: string): Promise<Show[]>
    findById(showId: string): Promise<Show | null>
    updateSeats(showId: string, selectedSeats: string[], isReserved: boolean): Promise<void>;
    getShows(query: { [key: string]: any }): Promise<Show[]>
    getTheatresWithShowsByMovieId(movieId: string, startDate: Date, endDate: Date): Promise<ITheatreWithShows[]>;
    updateShow(showId: string, updates: Partial<Pick<Show, "movieId" | "movieTitle" | "startTime">>): Promise<void>;
}


