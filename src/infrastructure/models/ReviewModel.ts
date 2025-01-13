import mongoose, { Schema, Document } from 'mongoose';


const ReviewSchema = new Schema(
    {
        // reviewId: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        movieId: { type: String, required: true },
        // movieTitle: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }, // Restrict rating between 1 and 5
        comment: { type: String, trim: true }, // Optional field for user comments
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model('Review', ReviewSchema);

export { ReviewModel };
