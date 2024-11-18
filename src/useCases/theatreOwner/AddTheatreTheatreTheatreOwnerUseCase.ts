import { ConflictError } from "../../domain/errors/ConflictError";
import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { generateUserId } from "../../utils/uuidUtils";

interface AddTheatre {
    theatreName: string;
    contactEmail: string;
    contactNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: string;
    ownerId: string;
}

export class AddTheatreTheatreOwnerUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatre: AddTheatre) {
        const theatreId = generateUserId();
        const existingTheatre = await this.theatreRepository.findDuplicateTheatre(theatre.ownerId, theatre.streetAddress);
        if (existingTheatre) {
            throw new ConflictError("A theatre with the same owner and street address already exists");
        }
        const newTheatre = await this.theatreRepository.create({ ...theatre, theatreId, isVerified: false });
        return newTheatre;
    }
}