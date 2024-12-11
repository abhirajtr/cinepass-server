export type TheatreStatus = "pending" | "verified" | "rejected";
export class Theatre {
    constructor(
        public theatreId: string,
        public name: string,
        public email: string,
        public phone: string,
        public address: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public verificationDocument: string,
        public ownerId: string,
        public licenseNumber: string,
        public status: TheatreStatus,
        public latitude: number,
        public longitude: number,
        public rejectionReason?: string,
    ) { }
}