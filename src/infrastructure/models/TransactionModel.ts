import mongoose, { Schema } from "mongoose";
import { Transaction } from "../../domain/entities/Transaction";


const TransactionSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },
        id: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const TransactionModel = mongoose.model<Transaction>("Transaction", TransactionSchema);

export { TransactionModel };
