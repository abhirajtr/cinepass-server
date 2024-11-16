import { Admin } from "../entities/Admin";

export interface IAdminRepository {
    // create(theatreOwner: Admin): Promise<Admin>;
    findByEmail(email: string): Promise<Admin | null>;
    // findByPhoneNumber(phoneNumber: string): Promise<Admin | null>;
    // updateById(userId: string, user: Partial<Admin>): Promise<Admin>;
}