import { TheatreOwner } from "../entities/TheatreOwner";

export interface ITheatreOwnerRepository {
    create(theatreOwner: TheatreOwner): Promise<TheatreOwner>;
    findByEmail(email: string): Promise<TheatreOwner | null>;
    findByPhoneNumber(phoneNumber: string): Promise<TheatreOwner | null>;
    updateById(userId: string, user: Partial<TheatreOwner>): Promise<TheatreOwner>;
    findAll(query: object, skip: number, limit: number): Promise<TheatreOwner[]>;
    findAllCount(query: object): Promise<number>;
    // findById(id: string): Promise<TheatreOwner | null>;
    // findByPhoneNumber(phoneNumber: string): Promise<TheatreOwner | null>;
    // updateById(userId: string, user: Partial<TheatreOwner>): Promise<TheatreOwner>;
    // updateByEmail(email: string, user: Partial<TheatreOwner>): Promise<TheatreOwner>;
    // delete(id: string): Promise<void>;
    // findAll(): Promise<TheatreOwner[]>;
    // findAllUsers(search: string, isBlocked: boolean | "", userRole: UserRole, skip: number, limit: number): Promise<{ users: TheatreOwner[], totalCount: number }>;
}