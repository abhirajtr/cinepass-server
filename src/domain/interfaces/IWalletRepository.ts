import { Wallet, ITransaction } from "../entities/Wallet";

export interface IWalletRepository {
    findByUserId(userId: string): Promise<Wallet | null>;
    createWallet(userId: string, initialBalance: number): Promise<Wallet>;
    updateBalance(userId: string, newBalance: number): Promise<Wallet | null>;
    addTransaction(userId: string, transaction: ITransaction): Promise<Wallet | null>;
}