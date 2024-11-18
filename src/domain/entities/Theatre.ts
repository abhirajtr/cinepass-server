export type TheatreStatus = "pending" | "verified" | "rejected";
export class Theatre {
    constructor(
        public theatreId: string,
        public theatreName: string,
        public contactEmail: string,
        public contactNumber: string,
        public streetAddress: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public verificationDocument: string,
        public ownerId: string,
        public status: TheatreStatus,
        public rejectionReason?: string
    ) { }
}