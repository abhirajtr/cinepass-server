export class TheatreOwner {
    constructor(
        public userId: string,
        public name: string,
        public email: string,
        public phone: string,
        public createdAt: Date,
        public password: string,
        public isBlocked: boolean,
    ) { }
}