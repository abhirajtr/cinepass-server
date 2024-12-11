import { Theatre } from "../entities/Theatre";

export interface ItheatreRepository {
    create(theatre: Theatre): Promise<Theatre>;
    findDuplicateTheatre(licenseNo: string): Promise<Theatre | null>;
    findTheatreByTheatreOwnerId(ownerId: string): Promise<Theatre[] | null>;
    findAll(query: Record<string, any>): Promise<Theatre[] | null>;
    updateByTheatreId(theatreId: string, theatre: Partial<Theatre>): Promise<Theatre | null>;
    find(theatreId: string): Promise<Theatre | null>
    // update(theatre: Partial<Theatre>):Promise<Theatre>
    update(theatreId: string, theatre: Partial<Theatre>): Promise<void>;
}