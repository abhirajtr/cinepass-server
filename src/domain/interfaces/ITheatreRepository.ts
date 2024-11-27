import { Theatre } from "../entities/Theatre";

export interface ItheatreRepository {
    create(theatre: Theatre): Promise<Theatre>;
    findDuplicateTheatre(licenseNo: string): Promise<Theatre | null>;
    findTheatreByTheatreOwnerId(ownerId: string): Promise<Theatre[] | null>;
    findAll(): Promise<Theatre[] | null>;
}