import { BadRequestError } from "../../domain/errors/BadRequestError";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IWalletRepository } from "../../domain/interfaces/IWalletRepository";
import { sendEmail } from "../../utils/emailUtils";
import { ticketCancellationContent } from "../../utils/ticketCancellation";

export class CancelTicketUseCase {
    constructor(
        private bookingRepository: IBookingRepository,
        private userRepository: IUserRepository,
        private showRepository: IShowRepository,
        private walletRepository: IWalletRepository,
    ) { }

    async execute(userId: string, bookingId: string) {
        const [user, booking] = await Promise.all([
            this.userRepository.findById(userId),
            this.bookingRepository.getUserBooking(bookingId)
        ])
        if (!booking || !user?.email) {
            throw new BadRequestError("Invalid ticket ID. Booking not found");
        }
        if (booking.status === "cancelled") {
            throw new BadRequestError("Ticket has already been cancelled")
        }
        if (booking.userId !== userId) {
            throw new ForbiddenError("You are not authorized to cancel this ticket");
        }
        await Promise.all([
            this.showRepository.updateSeats(booking.showId, booking.seats, false),
            this.bookingRepository.updateBooking(bookingId, { status: "cancelled" }),
            this.walletRepository.addTransaction(userId, { amount: booking.price, description: `cancellation of movie ticket ${booking.movieTitle}`, type: "credit", createdAt: new Date()}),
            sendEmail(user.email, "Ticket Cancellation", ticketCancellationContent(booking)),
        ])
    }
}