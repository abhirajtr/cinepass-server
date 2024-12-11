import { Seat } from "./Screen";

export class Show {
    constructor(
        public showId: string,
        public theatreId: string,
        public screenId: string,
        public movie: string,
        public startTime: Date,
        public endTime: Date,
        public seatLayout: Seat[][],
    ) { }
}