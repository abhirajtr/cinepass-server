import { User, UserRole } from "../entities/User";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhoneNumber(phoneNumber: string): Promise<User | null>;
    updateById(userId: string, user: Partial<User>): Promise<User>;
    updateByEmail(email: string, user: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    findAll(query: object, skip: number, limit: number): Promise<User[]>;
    findAllCount(query: object): Promise<number>;
    findAllUsers(search: string, isBlocked: boolean | "", userRole: UserRole, skip: number, limit: number): Promise<{ users: User[], totalCount: number }>;
}