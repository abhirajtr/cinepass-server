import mongoose, { Schema, Document } from 'mongoose';
import { Booking } from '../../domain/entities/Booking';

// interface IBooking extends Document {
//     bookingId: string;
//     userId: string;
//     movieTitle: string;
//     theatreId: string;
//     showTime: Date;
//     seats: string[];
//     price: number;
//     createdAt: Date;
// }

const BookingSchema: Schema = new Schema<Booking>({
    bookingId: { type: String, required: true, unique: true },
    userId: { type: String, ref: 'user', required: true },
    movieTitle: { type: String, required: true },
    theatreId: { type: String, ref: 'theatre', required: true },
    showTime: { type: Date, required: true },
    seats: { type: [String], required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: "confirmed", enum: ["confirmed", "cancelled"] },
    showId: { type: String, required: true }
}, {
    timestamps: true,
});

const BookingModel = mongoose.model<Booking>('Booking', BookingSchema);

export { BookingModel };
