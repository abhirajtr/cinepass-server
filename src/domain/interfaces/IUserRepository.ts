import { User } from "../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    findUserById(userId: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserByPhone(phone: string): Promise<User | null>;
    updateUser(userId: string, updatedData: Partial<User>): Promise<User | null>;
    userExistsByEmail(email: string): Promise<boolean>;
    // getAllUsers(skip?: number, limit?: number): Promise<User[]>;
    updateUserByEmail(email: string, updatedData: Partial<User>): Promise<User | null>;
    // getUsersCount(): Promise<number>;
    getAllUsers(skip?: number, limit?: number, searchTerm?: string): Promise<User[]>;
    getUsersCount(searchTerm?: string): Promise<number>;
}