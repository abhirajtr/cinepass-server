import mongoose, { Schema } from "mongoose";
import { TheatreOwner } from "../../domain/entities/TheatreOwner";


const TheatreOwnerSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        isBlocked: { type: Boolean, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const TheatreOwnerModel = mongoose.model<TheatreOwner>("TheatreOwner", TheatreOwnerSchema);

export { TheatreOwnerModel };
