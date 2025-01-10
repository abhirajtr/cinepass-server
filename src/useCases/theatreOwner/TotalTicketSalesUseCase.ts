import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { BookingModel } from "../../infrastructure/models/BookingModel";
import { TheatreModel } from "../../infrastructure/models/TheatreModel";
import {
    format,
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    eachDayOfInterval,
} from "date-fns";

export class TotalTicketSalesUseCase {
    constructor(private bookingRepository: IBookingRepository) { }

    async execute(
        ownerId: string,
        filter: "today" | "weekly" | "monthly" | "yearly" | "custom",
        customStartDate?: Date,
        customEndDate?: Date
    ) {
        try {
            // Step 1: Fetch theatres owned by the owner
            const ownedTheatres = await TheatreModel.find({ ownerId }).select("theatreId");
            const theatreIds = ownedTheatres.map((theatre) => theatre.theatreId);

            if (theatreIds.length === 0) {
                return { totalSales: 0, message: "No theatres found for the owner." };
            }

            // Step 2: Determine date range
            const now = new Date();
            let startDate: Date, endDate: Date;

            switch (filter) {
                case "today":
                    startDate = startOfDay(now);
                    endDate = endOfDay(now);
                    break;
                case "weekly":
                    startDate = startOfWeek(now, { weekStartsOn: 1 });
                    endDate = endOfWeek(now, { weekStartsOn: 1 });
                    break;
                case "monthly":
                    startDate = startOfMonth(now);
                    endDate = endOfMonth(now);
                    break;
                case "yearly":
                    startDate = startOfYear(now);
                    endDate = endOfYear(now);
                    break;
                case "custom":
                    if (!customStartDate || !customEndDate) {
                        throw new Error("Custom date range requires both startDate and endDate.");
                    }
                    startDate = customStartDate;
                    endDate = customEndDate;
                    break;
                default:
                    throw new Error("Invalid filter specified.");
            }

            // Ensure no dates after today
            if (endDate > now) {
                endDate = endOfDay(now);
            }

            // Step 3: Fetch bookings within the date range
            const bookings = await BookingModel.find({
                theatreId: { $in: theatreIds },
                createdAt: { $gte: startDate, $lte: endDate },
            });

            // Step 4: Calculate total sales per day
            const totalSalesPerDay = bookings.reduce((acc, booking) => {
                const bookingDate = format(booking.createdAt, "yyyy-MM-dd");
                const totalRevenue = booking.price;

                if (acc[bookingDate]) {
                    acc[bookingDate].ticketsSold += booking.seats.length;
                    acc[bookingDate].revenue += totalRevenue;
                } else {
                    acc[bookingDate] = {
                        date: new Date(bookingDate),
                        ticketsSold: booking.seats.length,
                        revenue: totalRevenue,
                    };
                }

                return acc;
            }, {} as Record<string, { date: Date; ticketsSold: number; revenue: number }>);

            // Step 5: Ensure all days in the range up to today have data
            const fullDateRange = eachDayOfInterval({ start: startDate, end: endDate }).map((date) => {
                const formattedDate = format(date, "yyyy-MM-dd");
                return totalSalesPerDay[formattedDate] || {
                    date,
                    ticketsSold: 0,
                    revenue: 0,
                };
            });

            // Step 6: Aggregate results
            const totalData = fullDateRange.reduce(
                (acc, day) => {
                    acc.totalRevenue += day.revenue;
                    acc.totalTickets += day.ticketsSold;
                    return acc;
                },
                { totalRevenue: 0, totalTickets: 0 }
            );

            return {
                totalRevenue: totalData.totalRevenue,
                totalTickets: totalData.totalTickets,
                dailySalesData: fullDateRange,
                message: "Revenue and booking count calculated successfully.",
            };
        } catch (error) {
            console.error("Error fetching ticket sales:", error);
            throw new Error("An error occurred while fetching ticket sales.");
        }
    }
}
