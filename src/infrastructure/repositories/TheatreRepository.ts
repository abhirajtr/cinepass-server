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
        const updatedTheatre = await TheatreModel.findOneAndUpdate({ theatreId }, {
            set: {
                updatedData
            }
        });
        return updatedTheatre;
    }
    async updateTheatreByEmail(email: string, updatedData: Partial<Theatre>): Promise<Theatre | null> {
        const updatedTheatre = await TheatreModel.findOneAndUpdate({ email }, {
            set: {
                updatedData
            }
        });
        return updatedTheatre;
    }

    async findTheatreByPhone(phone: string): Promise<Theatre | null> {
        return await TheatreModel.findOne({ phone });
    }

}