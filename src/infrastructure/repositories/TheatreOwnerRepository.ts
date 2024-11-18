import { TheatreOwner } from "../../domain/entities/TheatreOwner";
import { ITheatreOwnerRepository } from "../../domain/interfaces/ITheatreOwnerRepository";
import { TheatreOwnerModel } from "../models/TheatreOwnerModel";

export class TheatreOwnerRepository implements ITheatreOwnerRepository {
    async create(theatreOwner: TheatreOwner): Promise<TheatreOwner> {
        return await TheatreOwnerModel.create(theatreOwner);
    }

    async findByEmail(email: string): Promise<TheatreOwner | null> {
        return await TheatreOwnerModel.findOne({ email });
    }

    async findByPhoneNumber(phoneNumber: string): Promise<TheatreOwner | null> {
        return await TheatreOwnerModel.findOne({ password: phoneNumber });
    }

    async updateById(userId: string, user: Partial<TheatreOwner>): Promise<TheatreOwner> {
        const updatedUser = await TheatreOwnerModel.findOneAndUpdate({ userId }, user, { new: true });
        return updatedUser!;
    }

    async findAllCount(query: object): Promise<number> {
        return await TheatreOwnerModel.find(query).countDocuments();
    }
    async findAll(query: object, skip: number, limit: number): Promise<TheatreOwner[]> {
        return await TheatreOwnerModel.find(query).skip(skip).limit(limit);
    }
}