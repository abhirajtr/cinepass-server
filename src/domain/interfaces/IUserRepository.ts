import { User } from "../entities/User";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhoneNumber(phoneNumber: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<User>;
    updateByEmail(email: string, user: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    findAll(): Promise<User[]>;
}
