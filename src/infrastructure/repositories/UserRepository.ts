import { User, UserRole } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {

    // Find all users
    async findAllCount(query: object): Promise<number> {
        return await UserModel.find(query).countDocuments();
    }
    async findAll(query: object, skip: number, limit: number): Promise<User[]> {
        return await UserModel.find(query).skip(skip).limit(limit);
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
        return await UserModel.findOne({ phone: phoneNumber });
    }

    // Create a new user
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    // Update an existing user by ID
    async updateById(userId: string, user: Partial<User>): Promise<User> {
        const updatedUser = await UserModel.findOneAndUpdate({ userId }, user, { new: true });
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

    // async findAllUsers(se): Promise<User[]> {
    //     return await UserModel.find({ role: userRole });
    // }
    async findAllUsers(search: string, isBlocked: boolean | "", userRole: UserRole, skip: number, limit: number): Promise<{ users: User[], totalCount: number }> {
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },  // Case-insensitive search for name
                { email: { $regex: search, $options: 'i' } }, // Case-insensitive search for email
                { phone: { $regex: search, $options: 'i' } }  // Case-insensitive search for phone
            ];
        }
        if (isBlocked !== "") {
            query.isBlocked = isBlocked;
        }
        query.role = { $ne: 'admin' };
        if (userRole) {
            query.role = userRole;
        }
        // console.log("query:", query);

        const users = await UserModel.find(query).skip(skip).limit(limit);
        const totalCount = await UserModel.countDocuments(query);
        return { users, totalCount };
    }
}
