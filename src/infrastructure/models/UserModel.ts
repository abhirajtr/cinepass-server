import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    userId: string;
    email: string;
    phone: string;
    password: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    username: string;
}

const UserSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        default: ""
    }
});

UserSchema.pre<IUser>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);