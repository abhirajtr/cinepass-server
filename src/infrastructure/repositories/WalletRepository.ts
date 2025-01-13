import { ITransaction, Wallet } from "../../domain/entities/Wallet";
import { IWalletRepository } from "../../domain/interfaces/IWalletRepository";
import { WalletModel } from "../models/WalletModel";

export class WalletRepository implements IWalletRepository {
    async findByUserId(userId: string): Promise<Wallet | null> {
        const wallet = await WalletModel.findOne({ userId });
        if (wallet) {
            wallet.transaction.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
    
        return wallet;
    }
    createWallet(userId: string, initialBalance: number): Promise<Wallet> {
        const wallet = new WalletModel({ userId, balance: initialBalance });
        return wallet.save();
    }
    async updateBalance(userId: string, newBalance: number): Promise<Wallet | null> {
        return await WalletModel.findByIdAndUpdate({ userId }, { balance: newBalance }, { upsert: true, new: true });
    }
    async addTransaction(userId: string, transaction: ITransaction): Promise<Wallet | null> {
        const wallet = await WalletModel.findOneAndUpdate(
            { userId },
            {
                $push: { transaction },
                $inc: { balance: transaction.type === "credit" ? transaction.amount : -transaction.amount }
            },
            { new: true, upsert: true }
        );
        return wallet;
    }
}