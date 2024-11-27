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

    async findAll(): Promise<Theatre[] | null> {
        return await TheatreModel.find();
    }
}