import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {

    // Find all users
    async findAll(): Promise<User[]> {
        return await UserModel.find();
    }

    // Find a user by ID
    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id);
    }

    // Find a user by email
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email });
    }

    // Find a user by phone number
    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return await UserModel.findOne({ phoneNumber });
    }

    // Create a new user
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    // Update an existing user by ID
    async update(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser!;
    }

    // Update an existing user by email
    async updateByEmail(email: string, user: Partial<User>): Promise<User> {
        const updatedUser = await UserModel.findOneAndUpdate({ email }, user, { new: true });
        return updatedUser!;
    }

    // Delete a user by ID
    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
