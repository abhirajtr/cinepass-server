import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import Stripe from "stripe";
import { generateUserId } from "../../utils/uuidUtils";



export interface SuccessBookingResponse {
    success: boolean;
    message: string;
}

export class SuccessBookingUseCase {
    private stripe: Stripe;

    constructor(
        private showRepository: IShowRepository,
        private bookingRepository: IBookingRepository,
        stripeSecretKey: string
    ) {
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: "2024-11-20.acacia",
        });
    }

    async execute(sessionId: string): Promise<SuccessBookingResponse> {

        try {
            // Retrieve the session details from Stripe
            const session = await this.stripe.checkout.sessions.retrieve(sessionId);
            console.log("sss", session);
            
            if (session.payment_status !== "paid") {
                return {
                    success: false,
                    message: "Payment not verified.",
                };
            }

            // Extract metadata
            const showId = session.metadata?.showId;
            const userId = session.metadata?.userId;
            const selectedSeats = session.metadata?.selectedSeats
                ? JSON.parse(session.metadata.selectedSeats)
                : [];

            if (!showId || !selectedSeats.length) {
                return {
                    success: false,
                    message: "Invalid booking data.",
                };
            }

            // Update the show seat booking status
            const show = await this.showRepository.findById(showId);

            if (!show) {
                return {
                    success: false,
                    message: "Show not found.",
                };
            }

            selectedSeats.forEach((seatLabel: string) => {
                const seat = this.findSeatByLabel(show, seatLabel);
                if (seat) {
                    seat.isBooked = true;
                }
            });

            // Save the updated show in the repository
            await this.showRepository.updateSeats(showId, selectedSeats, true);
            await this.bookingRepository.create({
                bookingId: generateUserId(), 
                movieTitle:show.movieTitle, 
                price: Number(session.amount_total), 
                seats:selectedSeats, 
                showTime: show.startTime, 
                theatreId: show.theatreId, 
                userId: userId!,
            });

            return {
                success: true,
                message: "Booking confirmed successfully.",
            };
        } catch (error) {
            console.error("Error processing booking success:", error);
            return {
                success: false,
                message: "An error occurred while confirming the booking.",
            };
        }
    }

    private findSeatByLabel(show: any, seatLabel: string): any {
        for (const row of show.seatLayout) {
            const seat = row.find((seat: any) => seat.label === seatLabel);
            if (seat) return seat;
        }
        return null;
    }
}
