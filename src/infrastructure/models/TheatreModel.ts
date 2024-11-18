import mongoose, { Schema } from "mongoose";

export interface ITheatre extends Document {
    theatreId: string;
    theatreName: string;
    contactEmail: string;
    contactNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: string;
    ownerId: string;
    isVerified: boolean;
}

const TheatreSchema: Schema = new Schema(
    {
        theatreId: { type: String, required: true, unique: true },
        theatreName: { type: String, required: true },
        contactEmail: { type: String, required: true },
        contactNumber: { type: String, required: true },
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        verificationDocument: { type: String, required: true },
        ownerId: { type: String, required: true },
        isVerified: { type: Boolean, required: true },
    }, {
    timestamps: true
}
)

TheatreSchema.index(
    { ownerId: 1, theatreName: 1, streetAddress: 1, city: 1, state: 1, zipCode: 1 },
    { unique: true }
);

const TheatreModel = mongoose.model<ITheatre>("theatre", TheatreSchema);

export { TheatreModel };