import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
    id: string;
    title: string;
    genre: string[];
    language: string;
    releaseDate: string;
    posterPath: string;
    runtime: string;
    backdropPath: string;
}



const MovieSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        genre: { type: [String], required: true },
        language: { type: String, required: true },
        releaseDate: { type: String, required: true },
        posterPath: { type: String, required: true },
        runtime: { type: String, required: true },
        backdropPath: { type: String, required: true },
    }, {
    timestamps: true
})

const MovieModel = mongoose.model<IMovie>("movie", MovieSchema);

export { MovieModel };