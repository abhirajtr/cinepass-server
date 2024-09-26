import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const createdUser = new UserModel(user);
        await createdUser.save();
        return createdUser.toObject();
    }
    async findUserById(userId: string): Promise<User | null> {
        const user = await UserModel.findOne({ userId });
        return user ? user.toObject() : null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email });
        return user ? user.toObject() : null;
    }

    async findUserByPhone(phone: string): Promise<User | null> {
        const user = await UserModel.findOne({ phone });
        return user ? user.toObject() : null;
    }
    async userExistsByEmail(email: string): Promise<boolean> {
        const user = await UserModel.findOne({ email });
        return user !== null;
    }
    // async getAllUsers(skip?: number, limit?: number): Promise<User[]> {
    //     const users = await UserModel.find().skip(skip!).limit(limit!);
    //     return users;
    // }
    // async getAllUsers(): Promise<User[]> {
    //     const users = await UserModel.find();
    //     return users;
    // }
    async updateUser(userId: string, updatedData: Partial<User>): Promise<User | null> {
        const updateduser = await UserModel.findOneAndUpdate({ userId },
            { $set: updatedData },
            { new: true }
        );
        if (!updatedData) {
            return null;
        }
        return updateduser;
    }

    async updateUserByEmail(email: string, updatedData: Partial<User>): Promise<User | null> {
        const updateduser = await UserModel.findOneAndUpdate({ email },
            { $set: updatedData },
            { new: true }
        );
        if (!updatedData) {
            return null;
        }
        return updateduser;
    }
    // async getUsersCount(): Promise<number> {
    //     return await UserModel.countDocuments();
    // }

    async getAllUsers(skip: number = 0, limit: number = 10, searchTerm: string = ""): Promise<User[]> {
        const searchRegex = new RegExp(searchTerm, 'i');        
        const users = await UserModel.find({
            $or: [
                { username: searchRegex},
                { email: searchRegex },
            ]
        }).skip(skip).limit(limit);
        return users;
    }
    async getUsersCount(searchTerm: string = ""): Promise<number> {
        const searchRegex = new RegExp(searchTerm);
        const count = await UserModel.countDocuments({
            $or: [
                { username: searchRegex },
                { email: searchRegex },
            ]
        });
        return count;
    }
}