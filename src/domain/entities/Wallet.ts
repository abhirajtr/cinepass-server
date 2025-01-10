export interface ITransaction {
    amount: number,
    description: string,
    type: "credit" | "debit",
    createdAt: Date,
}
export class Wallet {
    constructor(
        public userId: string,
        public balance: number,
        public transaction: ITransaction[],
    ) { }
}