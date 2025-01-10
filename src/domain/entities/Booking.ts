export class Booking {
    constructor(
        public bookingId: string,
        public userId: string,
        public movieTitle: string,
        public theatreId: string,
        public showTime: Date,
        public seats: string[],
        public price: number,
        public status: "confirmed" | "cancelled",
        public createdAt: Date,
        public showId: string,
        public updatedAt?: Date,
    ) { }
}