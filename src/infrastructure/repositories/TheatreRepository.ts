import { Theatre } from "../../domain/entities/Theatre";
import { IGetTheatresParams, ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";
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

    async findByOwnerId(ownerId: string): Promise<Theatre[]> {
        return await TheatreModel.find({ ownerId });
    }

    async getTheatres(query: any, sortCriteria: any, skip: number, limit: number): Promise<Theatre[]> {
        try {
            return await TheatreModel.find(query)
                .sort(sortCriteria)   // Apply sorting
                .skip(skip)            // Apply pagination
                .limit(limit)          // Apply pagination limit
                .exec();
        } catch (error) {
            throw new Error(`Failed to fetch theatres: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}