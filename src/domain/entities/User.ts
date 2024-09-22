export class User {
    constructor(
        public userId: string,
        public email: string,
        public phone: string,
        public password: string,
        public isBlocked: boolean,
        public readonly createdAt: Date = new Date(),
        public updatedAt: Date,
    ) {}
}