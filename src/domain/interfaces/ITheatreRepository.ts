import { Theatre } from "../entities/Theatre";

export interface ITheatreRepository {
    saveTheatre(theatre: Theatre): Promise<Theatre>
    findTheatreById(theatreId: string): Promise<Theatre | null>;
    findTheatreByEmail(email: string): Promise<Theatre | null>
    updateTheatreById(theatreId: string, updatedData: Partial<Theatre>): Promise<Theatre | null>;
    updateTheatreByEmail(email: string, updatedData: Partial<Theatre>): Promise<Theatre | null>;
    findTheatreByPhone(phone: string): Promise<Theatre | null>;
    getAllTheatres(skip?: number, limit?: number, searchTerm?: string): Promise<Theatre[]>
    getTheatresCount(searchTerm: string): Promise<number>;
}