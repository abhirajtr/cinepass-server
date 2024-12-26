export class Seat {
    constructor(
        public id: string,
        public label: string,
        public type: string,
        public price: number,
        public isBooked: boolean,
    ) {}
}

export class Screen {
    constructor(
        public id: string,
        public theatreId: string,
        public name: string,
        public seatLayout: Seat[][],
        public capacity: number,
    ) {}
}
