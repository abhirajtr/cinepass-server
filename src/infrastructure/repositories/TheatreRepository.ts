import { Theatre } from "../../domain/entities/Theatre";
import { TheatreModel } from "../models/TheatreModel";


export class TheatreRepository implements TheatreRepository {

    async create(theatre: Theatre): Promise<Theatre> {
        const newTheatre = new TheatreModel(theatre);
        return await newTheatre.save();
    }
    async findDuplicateTheatre(licenseNumber: string): Promise<Theatre | null> {
        return await TheatreModel.findOne({ licenseNumber });
    }

    async findTheatreByTheatreOwnerId(ownerId: string): Promise<Theatre[] | null> {
        return await TheatreModel.find({ ownerId });
    }

    async findAll(query: Record<string, any>): Promise<Theatre[] | null> {
        return await TheatreModel.find(query).sort({ updatedAt: -1 });
    }

    async updateByTheatreId(theatreId: string, theatre: Partial<Theatre>): Promise<Theatre | null> {
        return await TheatreModel.findOneAndUpdate({ theatreId }, { $set: theatre }, { new: true });
    }

    async find(theatreId: string): Promise<Theatre | null> {
        return await TheatreModel.findOne({ theatreId });
    }
    async update(theatreId: string, theatre: Partial<Theatre>): Promise<Theatre | null> {
        const updatedTheatre = await TheatreModel.findOneAndUpdate(
            { theatreId },          // Query to find the theatre
            { $set: theatre },      // Apply partial updates
            { new: true }           // Return the updated document
        ).lean(); // Optional: Convert Mongoose document to plain object

        return updatedTheatre;
    }
}