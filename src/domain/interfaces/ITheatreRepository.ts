import { Theatre } from "../entities/Theatre";

// interface TheatreFilterOptions {
//     name?;
// }

export interface IGetTheatresParams {
    filter: object;       // Object with filter criteria, like verification status or search terms
    searchTerm: string;   // Search term to match in theater name
    sort: string;         // Field to sort by, e.g., "theatreName"
    skip: number;         // Number of records to skip for pagination
    limit: number;        // Page size (number of records to return per page)
}



export interface ITheatreRepository {
    create(theatre: Theatre): Promise<Theatre>;
    findByOwnerId(ownerId: string): Promise<Theatre[]>;
    findByLocationAndName(
        theatreName: string,
        streetAddress: string,
        city: string,
        state: string,
        zipCode: string
    ): Promise<Theatre | null>;


    getTheatres(
        query: any, 
        sortCriteria: any, 
        skip: number, 
        limit: number
    ): Promise<Theatre[]>;

}
