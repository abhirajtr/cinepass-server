import mongoose, { Schema, Document } from "mongoose";

// Define CastMember Interface
export interface ICastMember {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
}

// Define CrewMember Interface
export interface ICrewMember {
    id: number;
    name: string;
    job: string;
    profilePath: string | null;
}

// Extend IMovie Interface to Include Crew
export interface IMovie extends Document {
    movieId: string;
    title: string;
    genre: string[];
    language: string;
    releaseDate: string;
    posterPath: string;
    runtime: string;
    backdropPath: string;
    overview: string;
    voteAverage: number;
    voteCount: number;
    cast: ICastMember[];
    crew: ICrewMember[]; // Added crew array
}

// CastMember Schema
const CastMemberSchema: Schema = new Schema<ICastMember>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    character: { type: String, required: true },
    profilePath: { type: String, default: null },
});

// CrewMember Schema
const CrewMemberSchema: Schema = new Schema<ICrewMember>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    job: { type: String, required: true },
    profilePath: { type: String, default: null },
});

// Movie Schema
const MovieSchema: Schema = new Schema<IMovie>(
    {
        movieId: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        genre: { type: [String], required: true },
        language: { type: String, required: true },
        releaseDate: { type: String, required: true },
        posterPath: { type: String, required: true },
        runtime: { type: String, required: true },
        backdropPath: { type: String, required: true },
        overview: { type: String, required: true },
        voteAverage: { type: Number, required: true },
        voteCount: { type: Number, required: true },
        cast: {
            type: [CastMemberSchema],
            required: true,
            validate: {
                validator: (value: ICastMember[]) => value.length <= 5,
                message: "Cast array cannot exceed 5 members.",
            },
        },
        crew: {
            type: [CrewMemberSchema],
            required: true,
            validate: {
                validator: (value: ICrewMember[]) => value.length <= 5,
                message: "Crew array cannot exceed 5 members.",
            },
        },
    },
    {
        timestamps: true,
    }
);

// Create Movie Model
const MovieModel = mongoose.model<IMovie>("movie", MovieSchema);

export { MovieModel };
