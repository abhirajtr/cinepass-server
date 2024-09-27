import mongoose, { Document, Schema } from "mongoose";

interface ITheatre extends Document {
    theatreId: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isBlocked: boolean;
    isApproved: boolean;
}

const TheatreSchema: Schema = new Schema({
    theatreId: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
});

// Add a pre-save hook to update the updatedAt timestamp
TheatreSchema.pre<ITheatre>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const TheatreModel = mongoose.model<ITheatre>('Theatre', TheatreSchema);
