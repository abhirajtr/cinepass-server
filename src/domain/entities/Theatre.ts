export class Theatre {
    constructor(
        public theatreId: string,
        public name: string,
        public email: string,
        public phone: string,
        public location: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public isBlocked: boolean,
        public isApproved: boolean,
    ) {}
}