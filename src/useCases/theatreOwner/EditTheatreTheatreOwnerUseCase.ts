import { Theatre } from "../../domain/entities/Theatre";
import { ConflictError } from "../../domain/errors/ConflictError";
import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { putObjectURL } from "../../utils/s3Utils";
import { generateUserId } from "../../utils/uuidUtils";

interface EditTheatre {
    theatreId: string
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

export class EditTheatreTheatreOwnerUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatre: EditTheatre): Promise<{ presignedUrl: string }> {
        const presignedUrl = await putObjectURL(`${theatre.theatreId}.pdf`, 'application/pdf');
        const theatreToSave: Theatre = {
            ...theatre,
            status: "pending",
            verificationDocument: `${theatre.theatreId}.pdf`,
        }
        await this.theatreRepository.update(theatre.theatreId, theatreToSave);
        return { presignedUrl };
    }
}