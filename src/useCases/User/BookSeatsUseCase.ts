import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20.acacia' });
const API_URL = process.env.API_URL;

export interface BookSeatsRequest {
    showId: string;
    userId: string;
    selectedSeats: string[];
    amountToCharge: number;
    useWalletBalance: boolean;
}

export interface BookSeatsResponse {
    unavailableSeats?: string[];
    sessionId?: string;
    success: boolean;
}

export class BookSeatsUseCase {
    private stripe: Stripe;

    constructor(
        private showRepository: IShowRepository,
        stripeSecretKey: string // Stripe API key for payment integration
    ) {
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: "2024-11-20.acacia",
        });
    }

    async execute(request: BookSeatsRequest): Promise<BookSeatsResponse> {
        const { showId, userId, selectedSeats } = request;
        console.log("userId--->", userId);

        // Fetch the show details
        const show = await this.showRepository.findById(showId);
        if (!show) {
            throw new NotFoundError("Show not found");
        }

        // Check for unavailable seats
        const unavailableSeats = selectedSeats.filter((seatLabel) =>
            show.seatLayout.some((row) =>
                row.some((seat) => seat.label === seatLabel && seat.isBooked)
            )
        );

        if (unavailableSeats.length > 0) {
            return { unavailableSeats, success: false };
        }

        // Calculate the total price
        const totalPrice = this.calculateTotalPrice(show, selectedSeats);
        console.log("t--->", totalPrice);

        // Create a Stripe Payment Intent
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Tickets for ${show.movieTitle}`,
                            // name: `Tickets for ${show.title}`,
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${API_URL}/user/seat-booking/success?sessionId={CHECKOUT_SESSION_ID}`, //Replace with your success URL
                cancel_url: 'http://your-cancel-url', //Replace with your cancel URL
                metadata: {
                    showId,
                    userId,
                    selectedSeats: JSON.stringify(selectedSeats), // Store seats data as a JSON string
                },
            });

            return { sessionId: session.id, success: true };
        } catch (error) {
            console.error("Error creating Stripe Payment Intent:", error);
            throw new Error("Payment initialization failed");
        }
    }

    private calculateTotalPrice(show: any, selectedSeats: string[]): number {
        return selectedSeats.reduce((total, seatLabel) => {
            const seat = this.findSeatByLable(show, seatLabel);
            return total + (seat?.price || 0); // Handle missing price gracefully
        }, 0) * 100; // Convert to smallest currency unit
    }

    private findSeatByLable(show: any, seatLabel: string): any {
        for (const row of show.seatLayout) {
            const seat = row.find((seat: any) => seat.label === seatLabel);
            if (seat) return seat;
        }
        return null;
    }

}
