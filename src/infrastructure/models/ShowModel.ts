import mongoose, { Schema, Document } from "mongoose";

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface IShow extends Document {
    showId: string;
    movieId: string;
    movieTitle: string;
    screenId: string;
    theatreId: string;
    startTime: Date;
    seatLayout: ISeat[][];
}

export const SeatSchema = new Schema<ISeat>({
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
},
    { _id: false }
);

// Show schema definition
const ShowSchema = new Schema<IShow>(
    {
        showId: { type: String, required: true, unique: true },
        movieId: { type: String, required: true },
        movieTitle: { type: String, required: true },
        screenId: { type: String, required: true },
        theatreId: { type: String, required: true },
        startTime: { type: Date, required: true },
        seatLayout: { type: [[SeatSchema]], required: true },
    },
    { timestamps: true }
);

// Create the Show model
const ShowModel = mongoose.model<IShow>("Show", ShowSchema);

export { ShowModel, IShow };
