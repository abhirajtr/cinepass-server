import mongoose, { Schema } from "mongoose";
import { TheatreStatus } from "../../domain/entities/Theatre";

export interface ITheatre extends Document {
    theatreId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: string;
    ownerId: string;
    licenseNumber: string;
    status: TheatreStatus;
    rejectionReason?: string;
}

const TheatreSchema: Schema = new Schema(
    {
        theatreId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        verificationDocument: { type: String, required: true },
        ownerId: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending",
        },
        licenseNumber: { type: String, required: true, unique: true },
        rejectionReason: { type: String, default: null },

    }, {
    timestamps: true
})

const TheatreModel = mongoose.model<ITheatre>("theatre", TheatreSchema);

export { TheatreModel };