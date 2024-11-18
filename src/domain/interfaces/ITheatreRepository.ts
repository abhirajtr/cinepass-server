import { Theatre } from "../entities/Theatre";

export interface ItheatreRepository {
    create(theatre: Theatre): Promise<Theatre>;
    findDuplicateTheatre(ownerId: string, streetAddress: string): Promise<Theatre | null>;
    findTheatreByTheatreOwnerId(ownerId: string): Promise<Theatre[] | null>;
}