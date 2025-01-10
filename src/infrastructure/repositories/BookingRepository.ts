import { Booking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { BookingModel } from "../models/BookingModel";

export class BookingRepository implements IBookingRepository {
    async create(booking: Booking): Promise<void> {
        await BookingModel.create(booking);
    }

    async getAllByUserId(userId: string): Promise<Booking[]> {
        return await BookingModel.find({ userId })
            .populate({
                path: "theatreId",
                select: "name latitude longitude city",
                localField: "theatreId",
                foreignField: "theatreId",
                model: "theatre",
            })
            .sort({ createdAt: -1 });
    }
    async calculateTotalRevenue(): Promise<number> {
        try {
            const totalRevenue = await BookingModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$price" },
                    },
                },
            ]);
            console.log(totalRevenue);

            return totalRevenue[0]?.totalRevenue || 0;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error calculating total revenue: ${error.message}`);
            }
            throw new Error('An unknown error occurred during total revenue calculation.');
        }
    }
    async countBookings(): Promise<number> {
        try {
            const count = await BookingModel.countDocuments();
            return count;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error counting bookings: ${error.message}`);
            }
            throw new Error('An unknown error occurred during counting bookings.');
        }
    }
    async getRecentBookings(limit: number = 10): Promise<Booking[]> {
        try {
            const bookings = await BookingModel.find()
                .select('bookingId movieTitle userId showTime') // Select the fields you need
                .sort({ showTime: -1 }) // Sort by showTime in descending order (most recent first)
                .limit(limit); // Limit the number of results (default to 10)
            console.log(bookings);
            return bookings;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching recent bookings: ${error.message}`);
            }
            throw new Error('An unknown error occurred during fetching recent bookings.');
        }
    }

    async getUserBooking(bookingId: string): Promise<Booking | null> {
        return await BookingModel.findOne({ bookingId });
    }
    async updateBooking(bookingId: string, booking: Partial<Booking>): Promise<void> {
        await BookingModel.findOneAndUpdate({ bookingId }, booking);
    }
}