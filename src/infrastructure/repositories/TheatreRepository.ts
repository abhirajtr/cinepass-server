import { Theatre } from "../../domain/entities/Theatre";
import { TheatreModel } from "../models/TheatreModel";


export class TheatreRepository implements TheatreRepository {

    async create(theatre: Theatre): Promise<Theatre> {
        const newTheatre = new TheatreModel(theatre);
        return await newTheatre.save();
    }
    async findDuplicateTheatre(ownerId: string, streetAddress: string): Promise<Theatre | null> {
        return await TheatreModel.findOne({ ownerId, streetAddress }).exec();
    }

    async findTheatreByTheatreOwnerId(ownerId: string): Promise<Theatre[] | null> {
        return await TheatreModel.find({ ownerId });
    }
}