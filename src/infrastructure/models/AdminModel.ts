import mongoose, { Schema, Document } from "mongoose";

interface IAdmin extends Document {
    adminId: string;
    email: string;
    password: string;
}

const AdminSchema: Schema = new Schema({
    adminId: {
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
    password: {
        type: String,
        required: true,
    },
});

export const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);