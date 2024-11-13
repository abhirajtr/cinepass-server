import { Theatre } from "../entities/Theatre";

export interface ITheatreRepository {
    create(theatre: Theatre): Promise<Theatre>;
    findByLocationAndName(
        theatreName: string,
        streetAddress: string,
        city: string,
        state: string,
        zipCode: string
    ): Promise<Theatre | null>;
    // findById(theatreId: string): Promise<Theatre | null>;
    // updateById(userId: string, user: Partial<Theatre>): Promise<Theatre>;
    // findAll(): Promise<Theatre[]>;
}
