import { Theatre } from "../domain/entities/Theatre";
import { ConflictError } from "../domain/errors/ConflictError";
import { ITheatreRepository } from "../domain/interfaces/ITheatreRepository";
import { generateUserId } from "../utils/uuidUtils";

interface ITheatre {
    theatreName: string,
    contactEmail: string,
    phoneNumber: string,
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    verificationDocument: string,
    ownerId: string,
}

export class AddTheatreUsecase {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) { }

    async addTheatre(theatre: ITheatre) {
        const existingTheatre = await this.theatreRepository.findByLocationAndName(theatre.theatreName, theatre.streetAddress, theatre.city, theatre.state, theatre.zipCode);
        if (existingTheatre) {
            throw new ConflictError("Theatre with this information already exists");
        }
        const theatreId = generateUserId();
        const newTheatre = new Theatre(
            theatreId,
            theatre.theatreName,
            theatre.contactEmail,
            theatre.phoneNumber,
            theatre.streetAddress,
            theatre.city,
            theatre.state,
            theatre.zipCode,
            theatre.verificationDocument,
            theatre.ownerId,
            false
        );
        console.log("theatre", newTheatre);
        await this.theatreRepository.create(newTheatre);
    }
}