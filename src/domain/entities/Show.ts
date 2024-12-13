import { Seat } from "./Screen";

export class Show {
    constructor(
        public showId: string,
        public theatreId: string,
        public screenId: string,
        public movieId: string,
        public movieTitle: string,
        public startTime: Date,
        public seatLayout: Seat[][],
    ) { }
}