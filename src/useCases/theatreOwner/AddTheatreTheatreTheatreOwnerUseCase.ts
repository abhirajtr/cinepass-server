import { Theatre } from "../../domain/entities/Theatre";
import { ConflictError } from "../../domain/errors/ConflictError";
import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { putObjectURL } from "../../utils/s3Utils";
import { generateUserId } from "../../utils/uuidUtils";

interface AddTheatre {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    licenseNumber: string;
    ownerId: string;
    latitude: number;
    longitude: number;
}

export class AddTheatreTheatreOwnerUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatre: AddTheatre): Promise<{ presignedUrl: string, newTheatre: Theatre }> {
        const existingTheatre = await this.theatreRepository.findDuplicateTheatre(theatre.licenseNumber);
        if (existingTheatre) {
            throw new ConflictError("A theatre with this license number already exists");
        }
        console.log("t--->", theatre);

        const theatreId = generateUserId();
        const presignedUrl = await putObjectURL(`${theatreId}.pdf`, 'application/pdf');
        const theatreToSave: Theatre = {
            ...theatre,
            theatreId,
            status: "pending",
            verificationDocument: `${theatreId}.pdf`,
        }
        const newTheatre = await this.theatreRepository.create(theatreToSave);
        return { presignedUrl, newTheatre };
    }
}