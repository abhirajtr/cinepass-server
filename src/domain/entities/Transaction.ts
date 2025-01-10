export class Transaction {
    constructor(
        public id: string,
        public userId: string,
        public createdAt: Date,
        public description: string,
        public amount: number,
    ) {}
}