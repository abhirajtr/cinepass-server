import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICity extends Document {
    name: string;
    state: string;
    zipCodes: number[];
    createdAt: Date;
    updatedAt: Date;
}

const CitySchema: Schema<ICity> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        zipCodes: {
            type: [Number],
            required: true,
            validate: (v: number[]) => v.every((zip) => zip > 0),
            message: "ZIP codes must be positive numbers.",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const CityModel: Model<ICity> = mongoose.model<ICity>("City", CitySchema);