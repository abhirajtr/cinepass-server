export class Theatre {
    constructor(
        public theatreId: string,
        public theatreName: string,
        public contactEmail:string,
        public contactNumber: string,
        public streetAddress: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public verificationDocument: string,
        public ownerId: string,
        public isVerified: boolean,
    ) {}
}