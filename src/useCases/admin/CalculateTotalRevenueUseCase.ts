import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class CalculateTotalRevenueUseCase {
    constructor(
        private bookingRepository: IBookingRepository,
    ) { }

    async execute() {
        try {
            const totalRevenue = await this.bookingRepository.calculateTotalRevenue();
            const bookings = await this.bookingRepository.countBookings();
            const recentBookings = await this.bookingRepository.getRecentBookings(10);
            return { totalRevenue, bookings, recentBookings };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to calculate total revenue: ${error.message}`);
            }
            throw new Error('An unknown error occurred while calculating total revenue.');
        }
    }
}