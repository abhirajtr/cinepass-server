import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../domain/entities/User";

const UserSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'theatreOwner', 'regularUser'], required: true },
        isBlocked: { type: Boolean, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export { UserModel };
