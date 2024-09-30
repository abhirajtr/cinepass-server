import { Theatre } from "../../domain/entities/Theatre";
import { ITheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { TheatreModel } from "../models/TheatreModel";

export class TheatreRepository implements ITheatreRepository {
    async saveTheatre(theatre: Theatre): Promise<Theatre> {
        const newDoc = new TheatreModel(theatre);
        await newDoc.save();
        return newDoc.toObject();
    }
    async findTheatreById(theatreId: string): Promise<Theatre | null> {
        const theatre = await TheatreModel.findOne({ theatreId });
        return theatre;
    }
    async findTheatreByEmail(email: string): Promise<Theatre | null> {
        const theatre = await TheatreModel.findOne({ email });
        return theatre;
    }
    async updateTheatreById(theatreId: string, updatedData: Partial<Theatre>): Promise<Theatre | null> {
        const updatedTheatre = await TheatreModel.findOneAndUpdate(
            { theatreId },
            { $set: updatedData },
            { new: true }
        );        
        return updatedTheatre
    }
    async updateTheatreByEmail(email: string, updatedData: Partial<Theatre>): Promise<Theatre | null> {
        const updatedTheatre = await TheatreModel.findOneAndUpdate(
            { email },
            { $set: updatedData },
            { new: true }
        );
        return updatedTheatre;
    }

    async findTheatreByPhone(phone: string): Promise<Theatre | null> {
        return await TheatreModel.findOne({ phone });
    }
    async getAllTheatres(skip: number = 0, limit: number = 10, searchTerm: string = ""): Promise<Theatre[]> {
        const searchRegex = new RegExp(searchTerm);
        return await TheatreModel.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
            ]
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    }

    async getTheatresCount(searchTerm: string): Promise<number> {
        const searchRegex = new RegExp(searchTerm);
        const count = await TheatreModel.countDocuments({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
            ]
        });
        return count;
    }
}