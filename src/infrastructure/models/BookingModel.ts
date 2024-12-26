import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
    bookingId: string;
    userId: string;
    movieTitle: string;
    theatreId: string;
    showTime: Date;
    seats: string[];
    price: number;
}

const BookingSchema: Schema = new Schema<IBooking>({
    bookingId: { type: String, required: true, unique: true },
    userId: { type: String, ref: 'user', required: true },
    movieTitle: { type: String, required: true },
    theatreId: { type: String, ref:'theatre', required: true },
    showTime: { type: Date, required: true },
    seats: { type: [String], required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});

const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);

export { BookingModel };
