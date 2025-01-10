import { model, Schema } from "mongoose";
import { Wallet } from "../../domain/entities/Wallet";

const TransactionSchema = new Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    createdAt: { type: Date, default: Date.now },
})

const WalletSchema = new Schema<Wallet>({
    userId: { type: String, unique: true, required: true },
    balance: { type: Number, required: true },
    transaction: { type: [TransactionSchema], default: [] },
});

export const WalletModel = model<Wallet>("Wallet", WalletSchema);