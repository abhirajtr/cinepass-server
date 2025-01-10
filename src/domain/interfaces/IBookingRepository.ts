import { Booking } from "../entities/Booking";

export interface IBookingRepository {
    create(booking: Booking): Promise<void>;
    getAllByUserId(userId: string): Promise<Booking[]>;
    calculateTotalRevenue(): Promise<number>;
    countBookings(): Promise<number>;
    getRecentBookings(limit: number): Promise<Booking[]>
    getUserBooking(bookingId: string): Promise<Booking | null>
    updateBooking(bookingId: string, booking: Partial<Booking>): Promise<void>;
}