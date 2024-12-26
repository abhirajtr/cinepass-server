import mongoose, { Schema, Document } from "mongoose";

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface IScreen extends Document {
    name: string;
    seatLayout: ISeat[][];
    theatreId: string;
    capacity: number;
}

export const SeatSchema = new Schema<ISeat>({
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    isBooked: { type: Boolean, required: true },
},
    { _id: false }
);

const ScreenSchema = new Schema<IScreen>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    seatLayout: { type: [[SeatSchema]], required: true },
    theatreId: { type: String, required: true },
    capacity: { type: Number, required: true },
}, { timestamps: true });

const ScreenModel = mongoose.model<IScreen>("Screen", ScreenSchema);

export { ScreenModel, ISeat, IScreen };