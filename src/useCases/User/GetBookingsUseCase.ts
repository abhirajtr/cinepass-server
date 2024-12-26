import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class GetBookingsUseCase {
    constructor(
        private bookingRepository: IBookingRepository,
    ) {}

    async execute(userId: string) {
        const bookings = await this.bookingRepository.getAllByUserId(userId);
        console.log("booking history", bookings);
        
        return bookings;
    }
}