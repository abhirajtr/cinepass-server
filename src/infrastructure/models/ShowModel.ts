import mongoose, { Schema, Document } from "mongoose";

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface IShow extends Document {
    movie: string;
    screenId: string;
    theatreId: string;
    startTime: Date;
    endTime: Date;
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
        movie: { type: String, required: true },
        screenId: { type: String, required: true },
        theatreId: { type: String, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        seatLayout: { type: [[SeatSchema]], required: true },
    },
    { timestamps: true }
);

// Create the Show model
const ShowModel = mongoose.model<IShow>("Show", ShowSchema);

export { ShowModel, IShow };
