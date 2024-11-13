import { Theatre } from "../../domain/entities/Theatre";
import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { TheatreModel } from "../models/TheatreModel";


export class TheatreRepository implements ITheatreRepository {

    async create(theatre: Theatre): Promise<Theatre> {
        try {
            const newTheatre = new TheatreModel(theatre);
            return await newTheatre.save();
        } catch (error) {
            throw new Error(`Failed to create theatre: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findByLocationAndName(theatreName: string, streetAddress: string, city: string, state: string, zipCode: string): Promise<Theatre | null> {
        const existingTheatre = await TheatreModel.findOne({ theatreName, streetAddress, city, state, zipCode });

        return existingTheatre ? existingTheatre.toObject() : null;
    }
}